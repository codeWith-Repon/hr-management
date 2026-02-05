import express from 'express';
import { EmployeeRoutes } from '../modules/Employee/employee.routes';

const router = express.Router();

const moduleRoutes = [
    {
        path: "/employee",
        router: EmployeeRoutes
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.router))

export default router