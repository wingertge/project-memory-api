export default class UnauthorizedException extends Error {
    constructor() {
        super("You are not authorized to access this resource.")
    }
}
