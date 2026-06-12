import { StatusCodes } from "http-status-codes";
import Job from "../models/Job.model.js";
import NotFoundError from "../errors/not-found.js";
import BadRequestError from "../errors/bad-request.js";

/**
 * @desc    Get all jobs created by the currently authenticated user
 * @route   GET /api/v1/jobs
 * @access  Private
 */
const getAllJobs = async (req, res) => {
  // Only fetch jobs belonging to the logged-in user
  const jobs = await Job.find({
    createdBy: req.user.userId,
  }).sort("createdAt");

  res.status(StatusCodes.OK).json({
    msg: "✅ Fetched all jobs successfully!",
    total_jobs: jobs.length,
    jobs,
  });
};

/**
 * @desc    Get a single job by ID
 * @route   GET /api/v1/jobs/:id
 * @access  Private
 */
const getSingleJob = async (req, res) => {
  // Extract values from request using nested destructuring
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  // Find job only if it belongs to the authenticated user
  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });

  // Job either doesn't exist or belongs to another user
  if (!job) {
    throw new NotFoundError(`🔴 No job found with id: ${jobId}`);
  }

  res.status(StatusCodes.OK).json({
    message: "✅ Fetched job successfully!",
    job,
  });
};

/**
 * @desc    Create a new job
 * @route   POST /api/v1/jobs
 * @access  Private
 */
const createJob = async (req, res) => {
  // Attach the authenticated user's ID to the new job
  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({
    message: "✅ Job successfully created!",
    job,
  });
};

/**
 * @desc    Update an existing job
 * @route   PATCH /api/v1/jobs/:id
 * @access  Private
 */
const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  // Prevent updating with empty values
  if (company === "" || position === "") {
    throw new BadRequestError("🔴 Company/Position fields cannot be empty!");
  }

  // Find and update only if the job belongs to the authenticated user
  const job = await Job.findOneAndUpdate(
    {
      _id: jobId,
      createdBy: userId,
    },
    req.body,
    {
      new: true, // Return updated document
      runValidators: true, // Run schema validators during update
    },
  );

  if (!job) {
    throw new NotFoundError(`🔴 No job found with id: ${jobId}`);
  }

  res.status(StatusCodes.OK).json({
    message: "✅ Updated job successfully!",
    job,
  });
};

/**
 * @desc    Delete a job
 * @route   DELETE /api/v1/jobs/:id
 * @access  Private
 */
const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  // Delete only if the job belongs to the authenticated user
  const job = await Job.findOneAndDelete({
    _id: jobId,
    createdBy: userId,
  });

  if (!job) {
    throw new NotFoundError(`🔴 No job found with id: ${jobId}`);
  }

  res.status(StatusCodes.OK).json({
    message: "✅ Selected job DELETED successfully!",
    deleted_job: job,
  });
};

export { getAllJobs, getSingleJob, createJob, updateJob, deleteJob };
