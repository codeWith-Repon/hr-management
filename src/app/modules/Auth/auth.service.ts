import { getKnex } from "../../../config/knex";
import ApiError from "../../errors/ApiError";
import { ILogin } from "./auth.interface";
import HttpStatus from "http-status";
import bcrypt from "bcryptjs"
import { createUserToken } from "../../utils/userToken";

class AuthService {
    private knex = getKnex();

    public async loginUser(payload: ILogin) {

        const user = await this.knex("hr_users")
            .where({ email: payload.email })
            .first();

        if (!user) {
            throw new ApiError(HttpStatus.NOT_FOUND, "User not found");
        }

        const isPasswordMatch = await bcrypt.compare(payload.password, user.password_hash)

        if (!isPasswordMatch) {
            throw new ApiError(HttpStatus.UNAUTHORIZED, "Invalid password");
        }

        const userTokens = createUserToken(user)

        const { password_hash, ...rest } = user

        return {
            accessToken: userTokens.accessToken,
            refreshToken: userTokens.refreshToken,
            user: rest
        };
    }
}

export const authService = new AuthService()