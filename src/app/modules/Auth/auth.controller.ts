import { Request, Response } from "express"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"
import { setAuthCookie } from "../../utils/setCookie"
import { authService } from "./auth.service"


class AuthController {

    public loginUser = catchAsync(async (req: Request, res: Response) => {
        const result = await authService.loginUser(req.body)

        setAuthCookie(res, result)

        sendResponse(res, {
            statusCode: httpStatus.CREATED,
            success: true,
            message: "User logged in successfully",
            data: result
        })
    })

    public logOutUser = catchAsync(async (req: Request, res: Response) => {
        res.clearCookie("accessToken")
        res.clearCookie("refreshToken")

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "User logged out successfully",
            data: null
        })
    })
}

export const authController = new AuthController()