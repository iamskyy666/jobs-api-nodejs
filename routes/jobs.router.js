import { Router } from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getSingleJob,
  updateJob,
} from "../controllers/jobs.controller.js";

const jobsRouter = Router();

jobsRouter.route("/").post(createJob).get(getAllJobs);
jobsRouter.route("/:id").get(getSingleJob).delete(deleteJob).patch(updateJob);

export default jobsRouter;
