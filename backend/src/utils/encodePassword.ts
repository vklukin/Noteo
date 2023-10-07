import { hashSync } from "bcryptjs";

export function encodePassword(password: string, salt: undefined | number = 7) {
    return hashSync(password, salt);
}
