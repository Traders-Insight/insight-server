import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initializeDatabaseConnections } from "./config/database";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(cors());
app.use(express.json());

// Middleware to parse URL-encoded data from incoming requests.
// 'extended: true' allows for rich objects and arrays to be encoded as URL-encoded data.
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.get("/health", (req: Request, res: Response) => {
  res.send("OK!!!");
});

// Connect to MongoDB when the server starts
const startServer = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await initializeDatabaseConnections();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.error("Failed to start Server..."), process.exit(1);
  }
};

startServer();
