import jwt from "jsonwebtoken";

import { SECRET_KEY } from "../../configs/secretKey/secretKey";

export class Token {
    static generateAccess(payload: any, expireTime: string | number | undefined = "7d") {
        return jwt.sign(payload, SECRET_KEY, { expiresIn: expireTime });
    }
}
