import express, { Router, Request, Response } from 'express';
import { Document } from 'mongoose';
import Batch from './batch.model';
import BatchController from './batch.controller';

const router: Router = express.Router();
const batchController: BatchController = new BatchController();

router.post('/analytics', (req: Request, res: Response) => {
  batchController.get_data(req, res);
});

export default router;
