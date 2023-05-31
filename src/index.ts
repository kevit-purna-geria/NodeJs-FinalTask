import express, { Express } from 'express';
import winston from 'winston';

// Connect to the Database
import './components/database/mongoDbConnection';
import mongoose from 'mongoose';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console()
  ]
});

const app: Express = express();
const port: string | number = process.env.PORT ;

import batchRouter from './components/modules/batch/batch.routes';
import adminRouter from './components/modules/admin/admin.routes';
import staffRouter from './components/modules/staff/staff.routes';
import studentRouter from './components/modules/student/student.routes';
import attendanceRouter from './components/modules/attendance/attendance.routes'
import departmentRouter from './components/modules/department /department.routes'


app.use(express.json());

app.use(batchRouter);
app.use(adminRouter);
app.use(studentRouter);
app.use(staffRouter)
app.use(attendanceRouter)
app.use(departmentRouter)

app.listen(port, () => {
  logger.info('Server is up on port ' + port);
});
