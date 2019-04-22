import auth0, {Identity as AuthIdentity, User as AuthUser, PasswordGrantOptions, UpdateUserData} from "auth0"
import debug from "debug"
import {oc} from "ts-optchain"
import {find} from "lodash"
import {AuthenticationError} from "apollo-server"
import {AuthResult, User} from "../../generated/graphql"

const log = debug("api:auth")

const getEmail = user => {
    const emailIdent = find(user.identities, (identity: AuthIdentity) => !!oc(identity).profileData.email())
    return (emailIdent && emailIdent.profileData!.email) || user.email
}

export const convertUser = (user: AuthUser): User => {
    return ({
        sub: user.user_id,
        id: user.app_metadata!.uuid,
        email: getEmail(user),
        name: user.user_metadata!.name,
        username: user.user_metadata!.username,
        picture: user.picture!,
        gender: user.user_metadata!.gender,
        locale: user.user_metadata!.locale,
        identities: user.identities!.map(identity => ({
            userId: identity.user_id,
            provider: identity.provider,
            connection: identity.connection,
            isSocial: identity.isSocial
        }))
    }) as any
}

class Auth {
    private baseSettings = {
        domain: process.env.AUTH0_DOMAIN!,
        clientId: process.env.AUTH0_CLIENT_ID!,
        clientSecret: process.env.AUTH0_CLIENT_SECRET!
    }

    private auth0 = new auth0.AuthenticationClient({
        ...this.baseSettings
    })

    private auth0Manage = new auth0.ManagementClient({
        ...this.baseSettings,
        scope: "read:users update:users create:users"
    })

    private userCache = {}

    public async getUser(id: string): Promise<AuthUser | null> {
        return await this.auth0Manage.getUser({id})
    }

    public async authenticate(code: string): Promise<AuthResult | null> {
        log("executing code grant")
        log("code:" + code)
        try {
            // @ts-ignore
            const result = await this.auth0.oauth.authorizationCodeGrant({
                code,
                redirect_uri: process.env.AUTH0_CALLBACK!
            })
            log("returning result: " + JSON.stringify(result))
            return {
                accessToken: result.access_token,
                tokenType: result.token_type,
                expiresIn: result.expires_in,
                idToken: result.id_token
            }
        } catch (e) {
            log(e)
            return null
        }
    }

    public async updateMetadata(uuid: string, metadata: object) {
        const user = await this.findById(uuid)
        return await this.auth0Manage.updateUserMetadata({id: user.user_id!}, metadata)
    }

    public async updatePassword(uuid: string, password: string, oldPassword: string) {
        const user = await this.findById(uuid)
        const emailIdent = find(user.identities, (identity: AuthIdentity) => oc(identity).profileData.email()) as AuthIdentity | undefined
        let signInData: PasswordGrantOptions
        let updateData: UpdateUserData
        if(emailIdent) {
            signInData = {
                username: emailIdent!.profileData!.email!,
                password: oldPassword,
                realm: emailIdent.connection
            }

            updateData = {
                connection: emailIdent.connection,
                password
            }
        } else {
            signInData = {
                username: user.email!,
                password: oldPassword
            }

            updateData = {password}
        }
        try {
            await this.auth0.oauth!.passwordGrant(signInData)
        } catch (e) {
            throw new AuthenticationError("Old password invalid")
        }

        return await this.auth0Manage.updateUser({id: user.user_id!}, updateData)
    }

    public async updateEmail(uuid: string, email: string) {
        const user = await this.findById(uuid)
        const emailIdent = find(user.identities, (identity: AuthIdentity) => oc(identity).profileData.email()) as AuthIdentity | undefined

        if(emailIdent) {
            if(emailIdent.profileData!.email === email) return
            const data = {
                connection: emailIdent.connection,
                email,
                verify_email: true
            }
            return await this.auth0Manage.updateUser({id: user.user_id!}, data)
        } else {
            if(user.email === email) return
            return await this.auth0Manage.updateUser({id: user.user_id!}, {email, verify_email: true})
        }
    }

    public async addDatabaseIdentity(uuid: string, email: string, password: string) {
        const user = await this.findById(uuid)
        const newProfile = await this.auth0.database!.signUp({email, password, connection: "Username-Password-Authentication"})
        // @ts-ignore
        return await this.auth0Manage.linkUsers(user.sub, {user_id: newProfile._id, provider: "auth0"})
    }

    public async findById(id: string): Promise<AuthUser> {
        const user = await this.auth0Manage.getUsers({
            search_engine: "v3",
            per_page: 1,
            page: 0,
            q: `app_metadata.id:"${id}"`
        })

        if(!user || user.length === 0) {
            log(`Couldn't find a user with id ${id}!`)
            throw new Error("Couldn't find a user with that ID")
        }
        return user[0]
    }

    public async findUserById(id: string): Promise<User> {
        if(this.userCache[id]) return this.userCache[id]

        const user = convertUser(await this.findById(id))
        this.userCache[id] = user
        return user
    }
}

export default Auth
