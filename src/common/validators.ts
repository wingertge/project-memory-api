import {length as unicodeLength} from "stringz"
import validator from "validator"
import {CardInput, DeckInput, PostInput, UserInput} from "../generated/graphql"

export const UNICODE_INVALID_CHARACTERS =
    /[\u200B-\u200D\uFEFF\u00A0\u1680​\u180e\u2000-\u2009\u200a\u202f\u205f\u3000\uDB40\uDC21\uFDFD\uD809\uDC2B\uD808\uDC31\uD80C\uDCF0\uDCF8\u0E01\u0E49\u0E2A\u0344\u036B\u030B\u0489\u031B\u0337\u0323\u0E47]/g

const shorterThan = (length: number, str: string) => unicodeLength(str) < length
const longerThan = (length: number, str: string) => unicodeLength(str) > length
const isEmpty = (str: string) => validator.isEmpty(str)
const hasInvalidCharacters = (str: string, invalidChars = UNICODE_INVALID_CHARACTERS) => !validator.matches(str, invalidChars)
const isEmail = (str: string) => validator.isEmail(str)

class ValidationError extends Error {
    constructor() {
        super("Input failed validation")
    }
}

const validateUsername = (username: string) => {
    if(isEmpty(username) ||
        longerThan(24, username) ||
        shorterThan(3, username) ||
        hasInvalidCharacters(username)
    ) throw new ValidationError()
}

const validateName = (name: string) => {
    if(isEmpty(name) || longerThan(100, name)) throw new ValidationError()
}

const validateEmail = (email: string) => {
    if(isEmpty(email) || !isEmail(email)) throw new ValidationError()
}

export const validateUser = (input: UserInput) => {
    if(input.username) validateUsername(input.username)
    if(input.name) validateName(input.name)
    if(input.email) validateEmail(input.email)
}

const validateCardString = (str: string) => {
    if(longerThan(400, str)) throw new ValidationError()
}

export const validateCard = (input: CardInput) => {
    if(input.meaning) validateCardString(input.meaning)
    if(input.pronunciation) validateCardString(input.pronunciation)
    if(input.translation) validateCardString(input.translation)
}

/*{fun: notEmpty, message: "Name can't be empty"},
{fun: longerThan(2), message: "Name needs to be at least 3 characters long"},
{fun: shorterThan(41), message: "Name needs to be 40 characters or less"}*/

const validateDeckName = (name: string) => {
    if(
        isEmpty(name) ||
        shorterThan(3, name) ||
        longerThan(40, name)
    ) throw new ValidationError()
}

export const validateDeck = (input: DeckInput) => {
    if(input.name) validateDeckName(input.name)
}

const validateContent = (content: string) => {
    if(longerThan(4000, content)) throw new ValidationError()
}

export const validatePost = (input: PostInput) => {
    if(input.content) validateContent(input.content)
}
