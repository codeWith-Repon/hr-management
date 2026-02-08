import { Router } from 'express';
import { reportController } from './report.controller';
import { checkAuth } from '../../middlewares/checkAuth';
import { validateRequest } from '../../middlewares/validateRequest';
import { ReportValidation } from './report.validation';

const router = Router();

router.get(
    '/attendance',
    checkAuth(),
    validateRequest(ReportValidation.monthlyASSchema, 'query'),
    reportController.getMonthlyAttendance
);

export const ReportRoutes = router;