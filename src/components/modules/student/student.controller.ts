import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Student from './student.model';

class StudentController {
  async studentReg(req:Request, res:Response) {
    try {
      const student = new Student(req.body);
      await student.save();

      res.status(201).send('Student Registered Successfully');
    } catch (e) {
      if (e.code === 11000) {
        res.status(400).send('Student Already registered!');
      } else {
        console.error(e);
        res.status(500).send('Internal Server Error');
      }
    }
  }

  async studentUpdate(req: Request, res:Response) {
    try {
      const regNum = req.params.regNum.replace(':', '');

      const student = await Student.findOneAndUpdate({ regNum: regNum }, req.body);
      res.json({ message: 'Student Data updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update Student Data' });
    }
  }
}

export default StudentController;
