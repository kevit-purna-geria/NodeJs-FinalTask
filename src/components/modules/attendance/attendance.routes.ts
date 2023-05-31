import express, { Router, Request, Response } from 'express';
import Authorization from '../../../middleware/middleware.auth';

import AttendanceController from './attendance.controller';

const router: Router = express.Router();
const authorization: Authorization = new Authorization();

const attendanceController: AttendanceController = new AttendanceController();

router.post('/staff/attendance', async (req: Request, res: Response) => {
  attendanceController.attendanceReg(req, res);
});

export default router;