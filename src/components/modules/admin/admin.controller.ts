import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import Admin from './admin.model';

class AdminController {
  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 8);
    return hashedPassword;
  }

  generateToken(email: string): string {
    const token = jwt.sign(email, 'Secret-key');
    return token;
  }

  async signUp(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    try {
      const admin = new Admin(req.body);
      admin.password = await this.hashPassword(password);
      await admin.save();

      
      res.status(201).send('Admin Registered Successfully');
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
    Admin.find({ email: req.body.email })
      .exec()
      .then((admin) => {
        if (admin.length < 1) {
          return res.status(401).send('User not Found');
        } else {
          // Compare passwords
          bcrypt.compare(req.body.password, admin[0].password, (err, result) => {
            if (err) {
              res.status(500).send(err);
            } else {
              if (result) {
                const token = jwt.sign(admin[0].name, 'Secret-Key');
                res.status(200).send(`Token : ${token}`);
                // res.send("token : ", token)
              } else {
                res.status(401).send('Passwords do not match!');
              }
            }
          });
        }
      })
      .catch((error) => {
        res.status(500).send('Error : '+ error);
      });
  }
}

export default AdminController;
