import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  decoded?: any;
}

class Authorization {
  admin_auth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        throw new Error('No token provided');
      }
      const decoded = jwt.verify(token, 'Secret-Key') as any;
      req.decoded = decoded;
    } catch (e) {
      res.status(401).send('Please Authenticate');
      return;
    }
    next();
  }

  staff_auth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        throw new Error('No token provided');
      }
      const decoded = jwt.verify(token, 'Staff') as any;
      req.decoded = decoded;
    } catch (e) {
      res.status(401).send('Please Authenticate');
      return;
    }
    next();
  }
}

export default Authorization;
