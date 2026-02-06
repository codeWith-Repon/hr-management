import { Request, Response } from "express"
import catchAsync from "../../../shared/catchAsync"
import { AuthService } from "./auth.service"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"
import { setAuthCookie } from "../../utils/setCookie"

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.loginUser(req.body)

    setAuthCookie(res, result)

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User logged in successfully",
        data: result
    })
})

const logOutUser = catchAsync(async (req: Request, res: Response) => {
    res.clearCookie("accessToken")
    res.clearCookie("refreshToken")

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged out successfully",
        data: null
    })
})

export const AuthController = {
    loginUser,
    logOutUser
}