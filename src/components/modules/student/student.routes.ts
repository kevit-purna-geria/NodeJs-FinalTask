import express, { Router, Request, Response } from 'express';
import Authorization from '../../../middleware/middleware.auth';
import StudentController from './student.controller';

const router: Router = express.Router();
const authorization: Authorization = new Authorization();
const studentController: StudentController = new StudentController();

router.post('/admin/students', authorization.admin_auth, async (req: Request, res: Response) => {
  studentController.studentReg(req, res);
});

router.put('/admin/students/:regNum', authorization.admin_auth, async (req: Request, res: Response) => {
  studentController.studentUpdate(req, res);
});

export default router;