import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectMongoDB, connectRedis } from "./config/database";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Middleware to parse URL-encoded data from incoming requests.
// 'extended: true' allows for rich objects and arrays to be encoded as URL-encoded data.
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.get("/health", (req: Request, res: Response) => {
  res.send("OK!!!");
});

// Connect to MongoDB and Redis when the server starts
const startServer = async () => {
  await connectMongoDB();
  await connectRedis();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Health check available at http://localhost:${PORT}/health`);
  });
};

startServer();
