import mongoose, { Document, Mongoose, Schema } from 'mongoose';

interface AttendanceDocument extends Document {
  branch: string;
  batch: number;
  semester:number;
  date: Date;
  data: []
}

const attendanceSchema = new Schema<AttendanceDocument>({
  branch: {
    type: String,
    required: true,
  },
  batch: {
    type: Number,
    required: true,
  },
  semester: {
    type:Number,
    required: true
  },
  date: {
    type: Date,
    required: true,
  },
  data: [{
    regNum :{
        type : Schema.Types.ObjectId,
        ref : "Student"
    },
    status : {
        type : String
    }
  }]
});

const Attendance = mongoose.model<AttendanceDocument>('Attendance', attendanceSchema);

export default Attendance;
