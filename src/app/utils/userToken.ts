import config from "../../config";
import { IHRUserResponse } from "../modules/HrUser/hrUser.interface";
import { generateToken } from "./jwt";


export const createUserToken = (user: IHRUserResponse) => {
    const jwtPayload = {
        userId: user.id,
        email: user.email,
    }

    const accessToken = generateToken(jwtPayload, config.jwt.secret as string, config.jwt.expiresIn as string);

    const refreshToken = generateToken(jwtPayload, config.jwt.refreshSecret as string, config.jwt.refreshExpiresIn as string);

    return { accessToken, refreshToken };
}