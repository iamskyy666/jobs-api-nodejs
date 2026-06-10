import "dotenv/config";
import "express-async-errors";

import express from "express";

import notFoundMiddleware from "./middleware/not-found.middleware.js";
import errorHandlerMiddleware from "./middleware/error-handler.middleware.js";
import authRouter from "./routes/auth.router.js";
import jobsRouter from "./routes/jobs.router.js";
import connectDB from "./db/connectDB.js";

const app = express();

app.use(express.json());

// routes
app.get("/", (_, res) => {
  res.send("Jobs API ✅");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

// middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// mongo-DB connection
connectDB(process.env.MONGO_URI);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ✅`);
});
