import mongoose from "mongoose";
import winston from "winston";

// Configure logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/database.log" }),
  ],
});

// Add console logging if not in production
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

// MongoDB Connection
export const connectMongoDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    const options = {
      autoIndex: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(mongoURI, options);
    logger.info("MongoDB connected successfully");

    mongoose.connection.on("error", (error) => {
      logger.error("MongoDB connection error:", error);
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("MongoDB disconnected. Attempting to reconnect...");
    });

    mongoose.connection.on("reconnected", () => {
      logger.info("MongoDB reconnected successfully");
    });
  } catch (error) {
    logger.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Graceful shutdown function
export const closeConnections = async () => {
  try {
    await mongoose.connection.close();
    logger.info("Database connections closed successfully");
  } catch (error) {
    logger.error("Error closing database connections:", error);
    process.exit(1);
  }
};

// Initialize all database connections
export const initializeDatabaseConnections = async () => {
  try {
    await connectMongoDB();
  } catch (error) {
    logger.error("Failed to initialize database connections:", error);
    process.exit(1);
  }
};
