import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Attendance from './attendance.model';

class AttendanceController {
  async attendanceReg(req:Request, res:Response) {
    try {
      const attendance = new Attendance(req.body);
      await attendance.save();

      res.status(201).send('Attendance Registered Successfully');
    } catch (e) {
      if (e.code === 11000) {
        res.status(400).send('Attendance Already registered!');
      } else {
        console.error(e);
        res.status(500).send('Internal Server Error');
      }
    }
  }
}

export default AttendanceController;
