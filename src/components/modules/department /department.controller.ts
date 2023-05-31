import bcrypt from 'bcrypt';
import { Request, Response, raw } from 'express';
import jwt from 'jsonwebtoken';
import Department from './department.model';

class DepartmentController {
  async departmentReg(req:Request, res:Response) {
    try {
      const department = new Department(req.body);

      const totalStudentsIntake = req.body.totalStudentsIntake
      const totalStudents = req.body.totalStudents

      const availableIntake = totalStudentsIntake - totalStudents
      department.availableIntake = availableIntake
      await department.save();
      res.status(201).send('Department Registered Successfully');
    } catch (e) {
      if (e.code === 11000) {
        res.status(400).send('Department Already registered!');
      } else {
        console.error(e);
        res.status(500).send('Internal Server Error');
      }
    }
  }
  
  async available(req:Request, res:Response){
    try{
      const {batch, branch} = req.body
      
      const department = await Department.findOne({batch:batch, branch:branch})
      res.json({availableIntake : department.availableIntake})
    }catch(e){
      res.send("Unable to fetch Data")
    }

  }
//   async AttendanceUpdate(req: Request, res:Response) {
//     try {
//       const date = req.params.date.replace(':', '');
      
//       const attendance = await Attendance.findOneAndUpdate({ date: date }, {data : req.body});
      
//       res.json({ message: 'Attendance Data updated successfully' });
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to update Attendance Data' });
//     }
//   }

  
}

export default DepartmentController;
