import mongoose, { Document, Schema } from 'mongoose';

interface Branch {
  name: string;
  totalStudentsIntake: number;
}

interface BatchDocument extends Document {
  year: number;
  branches: Branch[];
}

const batchSchema = new Schema<BatchDocument>({
  year: {
    type: Number,
    required: true,
  },
  branches: [
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },
      totalStudentsIntake: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Batch = mongoose.model<BatchDocument>('Batch', batchSchema);
export default Batch;
