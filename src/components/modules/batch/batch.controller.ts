import { Request, Response } from 'express';
import Batch from './batch.model';

class BatchController {
  async get_data(req: Request, res: Response) {
    Batch.find({ year: req.body.year })
      .exec()
      .then((data) => {
        if (data.length < 1) {
          return res.status(401).send('Invalid Data');
        } else {
          const batch = data[0];
          const collect: any[] = [];
          const jsonData: { [key: string]: any } = {};

          jsonData.year = batch.year;
          const branches: { [key: string]: number } = {};
          const branch_intake: number[] = [];
          batch.branches.forEach((branch) => {
            const name = branch.name;
            branches[name] = branch.totalStudentsIntake;
            branch_intake.push(branch.totalStudentsIntake);
          });
          jsonData.totalStudents = branch_intake.reduce(
            (partialSum, a) => partialSum + a,
            0
          );
          jsonData.branches = branches;
          collect.push(jsonData);
          res.send(collect);
        }
      });
  }
}

export default BatchController;
