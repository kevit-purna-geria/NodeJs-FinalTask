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
  
  async attendanceUpdate(req: Request, res:Response) {
    try {
      const date = req.params.date.replace(':', '');
      console.log(1)
      const attendance = await Attendance.findOneAndUpdate({ date: date }, {data : req.body.data});
      
      res.json({ message: 'Attendance Data updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update Attendance Data' });
    }
  }

  async absent(req: Request, res:Response) {
    try {
      const {batch, branch, semester, date} = req.body;
      
      const attendance = await Attendance.findOne({batch: batch, branch:branch, semester:semester, date:date});
      
      
      const data = Object.values(attendance.data)
      
       
      const absentElements = data.filter((element) => element["status"] === "absent");

      res.json(absentElements);

    } catch (error) {
      res.status(500).json({ error: 'Failed to update Attendance Data' });
    }
  }
}

export default AttendanceController;
