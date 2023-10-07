import { User } from "../models/User";

export async function isUserExist(email: string): Promise<boolean> {
    const res = await User.findOne({
        where: {
            email: email
        }
    });

    return res !== null;
}
