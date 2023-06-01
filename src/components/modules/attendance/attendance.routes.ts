import express, { Router, Request, Response } from 'express';
import Authorization from '../../../middleware/middleware.auth';

import AttendanceController from './attendance.controller';

const router: Router = express.Router();
const authorization: Authorization = new Authorization();

const attendanceController: AttendanceController = new AttendanceController();

router.post('/staff/attendance', authorization.admin_auth,async (req: Request, res: Response) => {
  attendanceController.attendanceReg(req, res);
});

router.put('/staff/attendance/:date', authorization.admin_auth,async(req :Request, res:Response) => {
  attendanceController.attendanceUpdate(req,res)
})

router.get('/attendance/absent', authorization.admin_auth, async(req:Request, res:Response) =>{
  attendanceController.absent(req, res)
})

export default router;