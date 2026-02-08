export interface IMonthlyAttendanceSummary {
    employee_id: number;
    name: string;
    days_present: number;
    times_late: number;
}

export interface IAttendanceReportQuery {
    month: string;
    employee_id?: number;
}