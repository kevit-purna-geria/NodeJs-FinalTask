import express, { Router, Request, Response } from 'express';

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import StaffController from './staff.controller';
import Staff from './staff.model';

import Authorization from '../../../middleware/middleware.auth';
const authorization: Authorization = new Authorization();

const router = express.Router();
const staffController = new StaffController();

router.post('/admin/staff/signup', authorization.admin_auth, async(req:Request, res:Response)=>{
    staffController.signUp(req,res)
})

router.post('/staff/login', async (req:Request, res:Response) => {
  staffController.login(req, res);
});

export default router;
