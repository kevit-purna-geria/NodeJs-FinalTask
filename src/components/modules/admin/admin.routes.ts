import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AdminController from './admin.controller';
import Admin from './admin.model';

const router = express.Router();
const adminController = new AdminController();

router.post('/signup', (req: Request, res: Response) => {
  adminController.signUp(req, res);
});

router.post('/login', async (req: Request, res: Response) => {
  adminController.login(req, res);
});

export default router;
