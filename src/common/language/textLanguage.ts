import {DbLanguage} from "./language.model"

const supported = [
    "da",
    "nl",
    "en",
    "fi",
    "fr",
    "de",
    "hu",
    "it",
    "nb",
    "pt",
    "ro",
    "ru",
    "es",
    "sv",
    "tr"
]

export const getTextLang = (language: DbLanguage) => {
    const shortCode = language.languageCode.split("-")[0]
    return supported.includes(shortCode) ? shortCode : "none"
}
