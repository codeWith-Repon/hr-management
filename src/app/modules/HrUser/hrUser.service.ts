import { getKnex } from "../../../config/knex";
import ApiError from "../../errors/ApiError";
import { IHRUserCreateInput, IHRUserResponse } from "./hrUser.interface";
import HttpStatus from "http-status";
import bcrypt from "bcryptjs";
import config from "../../../config";

class HrUserService {
    private knex = getKnex();

    public async createHrUser(payload: IHRUserCreateInput): Promise<IHRUserResponse> {
        const existingUser = await this.knex("hr_users")
            .where({ email: payload.email })
            .first();

        if (existingUser) {
            throw new ApiError(HttpStatus.CONFLICT, "User already exists");
        }

        const password_hash = await bcrypt.hash(payload.password, Number(config.bcryptSaltRounds));

        const [newUser] = await this.knex("hr_users")
            .insert({
                name: payload.name,
                email: payload.email,
                password_hash
            })
            .returning(["id", "name", "email", "created_at", "updated_at"]);

        return newUser;
    }

    public async getUserByEmail(email: string): Promise<IHRUserResponse> {
        const user = await this.knex("hr_users")
            .where({ email })
            .select("id", "name", "email", "created_at", "updated_at")
            .first();

        if (!user) {
            throw new ApiError(HttpStatus.NOT_FOUND, "User not found");
        }

        return user;
    }

    public async getAllHrUsers(): Promise<IHRUserResponse[]> {
        const users = await this.knex("hr_users")
            .select("id", "name", "email", "created_at", "updated_at")
            .orderBy("id", "desc");

        return users;
    }

    public async updateHrUser(email: string, payload: Partial<IHRUserCreateInput>): Promise<IHRUserResponse> {
        const existingUser = await this.knex("hr_users")
            .where({ email })
            .first();

        if (!existingUser) {
            throw new ApiError(HttpStatus.NOT_FOUND, "User not found");
        }

        // Check if new email already exists
        if (payload.email && payload.email !== email) {
            const emailExists = await this.knex("hr_users")
                .where({ email: payload.email })
                .first();

            if (emailExists) {
                throw new ApiError(HttpStatus.CONFLICT, "This email already exists. Please use another email.");
            }
        }

        const updateData: any = {
            updated_at: this.knex.fn.now()
        };

        if (payload.name) updateData.name = payload.name;
        if (payload.email) updateData.email = payload.email;

        if (payload.password) {
            updateData.password_hash = await bcrypt.hash(payload.password, Number(config.bcryptSaltRounds));
        }

        const [updatedUser] = await this.knex("hr_users")
            .where({ email })
            .update(updateData)
            .returning(["id", "name", "email", "created_at", "updated_at"]);

        if (!updatedUser) {
            throw new ApiError(HttpStatus.NOT_FOUND, "User not found");
        }

        return updatedUser;
    }

    public async deleteHrUser(email: string): Promise<IHRUserResponse> {
        const [deletedUser] = await this.knex("hr_users")
            .where({ email })
            .del()
            .returning(["id", "name", "email", "created_at", "updated_at"]);

        if (!deletedUser) {
            throw new ApiError(HttpStatus.NOT_FOUND, "User not found");
        }

        return deletedUser;
    }
}

export const hrUserService = new HrUserService();