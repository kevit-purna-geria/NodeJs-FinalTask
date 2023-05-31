import express, { Express } from 'express';

// Connect to the Database
import './components/database/mongoDbConnection';
import mongoose from 'mongoose';

const app: Express = express();
const port: string | number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

import batchRouter from './components/modules/batch/batch.routes';

import adminRouter from './components/modules/admin/admin.routes';

import staffRouter from './components/modules/staff/staff.routes';

import studentRouter from './components/modules/student/student.routes';

import attendanceRouter from './components/modules/attendance/attendance.routes'
app.use(express.json());

app.use(batchRouter);

app.use(adminRouter);

app.use(studentRouter);

app.use(staffRouter)

app.use(attendanceRouter)

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
