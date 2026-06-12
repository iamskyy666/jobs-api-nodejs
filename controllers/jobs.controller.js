import { StatusCodes } from "http-status-codes";
import Job from "../models/Job.model.js";
import NotFoundError from "../errors/not-found.js";
import BadRequestError from "../errors/bad-request.js";

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({
    msg: "✅ Fetched all jobs successfully!",
    total_jobs: jobs.length,
    jobs,
  });
};

const getSingleJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req; // nested destructuring

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });

  if (!job) {
    throw new NotFoundError(`🔴 No job found with id: ${jobId}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ message: "✅ Fetched job successfully!", job });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ message: "✅ Job successfully created!", job });
};

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req; // nested destructuring

  if (company === "" || position === "") {
    throw new BadRequestError("🔴 Company/Position fields cannot be empty!");
  }

  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true },
  );

  if (!job) {
    throw new NotFoundError(`🔴 No job found with id: ${jobId}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ message: "✅ Updated job successfully!", job });
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req; // nested destructuring

  const job = await Job.findOneAndDelete({
    _id: jobId,
    createdBy: userId,
  });

  if (!job) {
    throw new NotFoundError(`🔴 No job found with id: ${jobId}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ message: "✅ Selected job DELETED successfully!", deleted_job: job });
};

export { getAllJobs, getSingleJob, createJob, updateJob, deleteJob };
