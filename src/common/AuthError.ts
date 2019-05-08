export enum ErrorType {
    Unauthenticated,
    Unauthorized
}

export default class AuthError extends Error {
    public constructor(type: ErrorType) {
        let message = ""
        switch (type) {
            case ErrorType.Unauthenticated:
                message = "You must be logged in to do that"
                break
            case ErrorType.Unauthorized:
                message = "You don't have permission to do that"
        }
        super(message)
    }
}

