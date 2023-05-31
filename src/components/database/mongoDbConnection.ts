import mongoose, { ConnectOptions, Mongoose } from "mongoose";

const dbURI = "mongodb://127.0.0.1:27017/clg-wizbiz";

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions)
  .then((mongooseInstance: Mongoose) => {
    console.log("Connected to MongoDB");
    // Perform any additional operations with mongooseInstance
  })
  .catch((error: Error) => {
    console.error("Failed to connect to MongoDB", error);
  });
