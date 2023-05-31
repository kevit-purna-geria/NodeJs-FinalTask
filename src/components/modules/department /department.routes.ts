import express, { Router, Request, Response } from 'express';
import Authorization from '../../../middleware/middleware.auth';

import DepartmentController from './department.controller';

const router: Router = express.Router();
const authorization: Authorization = new Authorization();

const departmentController: DepartmentController = new DepartmentController();

router.post('/admin/department', async (req: Request, res: Response) => {
    departmentController.departmentReg(req, res);
});

// router.put('/staff/attendance/:date', async(req :Request, res:Response) => {
//   attendanceController.AttendanceUpdate(req,res)
// })

export default router;