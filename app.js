import "dotenv/config";

import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

import connectDB from "./db/connectDB.js";

import authRouter from "./routes/auth.router.js";
import jobsRouter from "./routes/jobs.router.js";

import authMiddleware from "./middleware/authentication.middleware.js";
import notFoundMiddleware from "./middleware/not-found.middleware.js";
import errorHandlerMiddleware from "./middleware/error-handler.middleware.js";

const app = express();

/*
|--------------------------------------------------------------------------
| Proxy Configuration
|--------------------------------------------------------------------------
|
| Required when deploying behind a reverse proxy (Render, Railway,
| Heroku, Nginx, etc.). Ensures Express can correctly determine the
| client's IP address for rate limiting and other security features.
|
*/
app.set("trust proxy", 1);

/*
|--------------------------------------------------------------------------
| Core Middleware
|--------------------------------------------------------------------------
|
| Parse incoming JSON request bodies and make the data available on
| req.body.
|
*/
app.use(express.json());


/*
|--------------------------------------------------------------------------
| Security Middleware
|--------------------------------------------------------------------------
|
| Helmet      -> Sets secure HTTP headers.
| CORS        -> Controls cross-origin requests.
| Rate Limit  -> Protects against abuse, brute-force attacks, and
|                excessive API requests.
|
*/
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per IP per window
  }),
);

app.use(helmet());
app.use(cors());

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Auth Routes:
|   /api/v1/auth/register
|   /api/v1/auth/login
|
| Jobs Routes:
|   Protected routes requiring a valid JWT.
|
*/
app.get("/", (_, res) => {
  res.send("Jobs API ✅");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authMiddleware, jobsRouter);

/*
|--------------------------------------------------------------------------
| Error Handling Middleware
|--------------------------------------------------------------------------
|
| notFoundMiddleware:
|   Handles requests to undefined routes.
|
| errorHandlerMiddleware:
|   Centralized error handling for application, validation,
|   authentication, and database errors.
|
*/
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;

/*
|--------------------------------------------------------------------------
| Application Startup
|--------------------------------------------------------------------------
|
| 1. Establish MongoDB connection.
| 2. Start Express server only if the database connection succeeds.
|
| Prevents the API from accepting requests when the database is
| unavailable.
|
*/
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} ✅`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
