import mongoose, { ConnectOptions, Mongoose } from "mongoose";
import winston from 'winston';
import dotenv from 'dotenv';
dotenv.config();

const dbURI = process.env.DB_URI;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console()
  ]
});

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions)
  .then((mongooseInstance: Mongoose) => {
    logger.info("Connected to MongoDB");
    // Perform any additional operations with mongooseInstance
  })
  .catch((error: Error) => {
    logger.error("Failed to connect to MongoDB", error);
  });