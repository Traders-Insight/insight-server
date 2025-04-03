import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/health`);
});
