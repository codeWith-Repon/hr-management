import express from 'express';
import { EmployeeRoutes } from '../modules/Employee/employee.routes';
import { HrUserRoutes } from '../modules/HrUser/hrUser.route';

const router = express.Router();

const moduleRoutes = [
    {
        path: "/hr",
        router: HrUserRoutes
    },
    {
        path: "/employee",
        router: EmployeeRoutes
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.router))

export default router