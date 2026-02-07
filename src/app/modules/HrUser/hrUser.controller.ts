import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { hrUserService } from "./hrUser.service";
import httpStatus from "http-status";

class HrUserController {

    public createHrUser = catchAsync(async (req: Request, res: Response) => {
        const result = await hrUserService.createHrUser(req.body);

        sendResponse(res, {
            statusCode: httpStatus.CREATED,
            success: true,
            message: "HR user created successfully",
            data: result
        });
    });

    public getUserByEmail = catchAsync(async (req: Request, res: Response) => {
        const { email } = req.params;
        const result = await hrUserService.getUserByEmail(email as string);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "HR user retrieved successfully",
            data: result
        });
    });

    public getMe = catchAsync(async (req: Request, res: Response) => {
        const { email } = req.user;
        const result = await hrUserService.getUserByEmail(email);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Profile retrieved successfully",
            data: result
        });
    });

    public getAllHrUsers = catchAsync(async (req: Request, res: Response) => {
        const result = await hrUserService.getAllHrUsers();

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "All HR users retrieved successfully",
            data: result
        });
    });

    public updateHrUser = catchAsync(async (req: Request, res: Response) => {
        const { email } = req.user;
        const result = await hrUserService.updateHrUser(email, req.body);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "HR user updated successfully",
            data: result
        });
    });

    public deleteHrUser = catchAsync(async (req: Request, res: Response) => {
        const { email } = req.params;
        const result = await hrUserService.deleteHrUser(email as string);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "HR user deleted successfully",
            data: result
        });
    });
}

export const hrUserController = new HrUserController();