import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import Staff from './staff.model';

class StaffController {
  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 8);
    return hashedPassword;
  }

  generateToken(email: string): string {
    const token = jwt.sign(email, 'staff');
    return token;
  }

  async signUp(req: Request, res: Response): Promise<void> {
    // const { name, email, password } = req.body;

    try {
      const staff = new Staff(req.body);
      const password = staff.password
      staff.password = await this.hashPassword(password);
      await staff.save();

      console.log({ staff });
      res.status(201).send('Staff Registered Successfully');
    } catch (e) {
      if (e.code === 11000) {
        res.status(400).send('Email Already registered!');
      } else {
        console.error(e);
        res.status(500).send('Internal Server Error');
      }
    }
  }

  login(req: Request, res: Response): void {
    Staff.find({ email: req.body.email })
      .exec()
      .then((staff) => {
        if (staff.length < 1) {
          return res.status(401).send('User not Found');
        } else {
          // Compare passwords
          bcrypt.compare(req.body.password, staff[0].password, (err, result) => {
            if (err) {
              res.status(500).send(err);
            } else {
              if (result) {
                const token = jwt.sign(staff[0].name, 'Secret-Key');
                res.status(200).send(`Token: ${token}`);
              } else {
                res.status(401).send('Passwords do not match!');
              }
            }
          });
        }
      })
      .catch((error: any) => {
        res.status(500).send('Error: '+ error);
      });
  }
}

export default StaffController;
