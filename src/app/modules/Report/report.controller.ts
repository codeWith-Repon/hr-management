import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { reportService } from './report.service';

class ReportController {
    public getMonthlyAttendance = catchAsync(async (req: Request, res: Response) => {

        const result = await reportService.getMonthlyAttendanceSummary(req.query as any);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Monthly attendance summary retrieved successfully',
            data: result,
        });
    });
}

export const reportController = new ReportController();