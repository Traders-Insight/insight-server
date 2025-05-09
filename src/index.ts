import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initializeDatabaseConnections } from "./config/database";
import { userRoutes, loginRoutes, forgotPasswordRoute } from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(cors());
app.use(express.json());

// Middleware to parse URL-encoded data from incoming requests.
// 'extended: true' allows for rich objects and arrays to be encoded as URL-encoded data.
app.use(express.urlencoded({ extended: true }));

// Use user routes
app.use("/api", userRoutes);
app.use("/api", loginRoutes);
app.use("/api", forgotPasswordRoute);

// Middleware to handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
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
