import { EMAIL_REGEXP } from "../../constants/regExps";

export class Validation {
    static isTextEmpty(text: string): boolean {
        return text.trim().length === 0;
    }

    static isEmailValid(text: string): boolean {
        return EMAIL_REGEXP.test(text);
    }

    static checkTextLength(text: string, length: number) {
        return text.trim().length < length;
    }
}
