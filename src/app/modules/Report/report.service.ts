import { getKnex } from '../../../config/knex';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { IAttendanceReportQuery, IMonthlyAttendanceSummary } from './report.interface';

class ReportService {
    private knex = getKnex();

    public async getMonthlyAttendanceSummary(
        query: IAttendanceReportQuery
    ): Promise<IMonthlyAttendanceSummary[]> {
        const { month, employee_id } = query;

        const parts = month!.split('-');
        const year = Number(parts[0]);
        const mon = Number(parts[1]);

        if (isNaN(year) || isNaN(mon)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid month format');
        }

        const startDate = `${year}-${mon.toString().padStart(2, '0')}-01`;

        const endOfDateObj = new Date(year, mon, 0);
        const endDate: string = endOfDateObj.toISOString().split('T')[0]!;

        let qb = this.knex('attendance')
            .join('employees', 'attendance.employee_id', 'employees.id')
            .whereBetween('attendance.date', [startDate, endDate])
            .where('employees.is_deleted', false)
            .select(
                'attendance.employee_id',
                'employees.name',
                this.knex.raw('COUNT(*) as days_present'),
                this.knex.raw(
                    'COUNT(CASE WHEN attendance.check_in_time > \'09:45:00\' THEN 1 END) as times_late'
                )
            )
            .groupBy('attendance.employee_id', 'employees.name');

        if (employee_id) {
            qb = qb.where('attendance.employee_id', employee_id);
        }

        const results = await qb;

        if (results.length === 0) {
            return [];
        }

        return results;
    }
}

export const reportService = new ReportService();