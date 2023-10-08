import { hashSync, compareSync } from "bcryptjs";

export class PasswordController {
    private _password: string;

    constructor(private password: string) {
        this._password = password;
    }

    encodePassword(salt: number | undefined = 7): string {
        return hashSync(this._password, salt);
    }

    comparePasswords(comparedPassword: string): boolean {
        return compareSync(this._password, comparedPassword);
    }
}
