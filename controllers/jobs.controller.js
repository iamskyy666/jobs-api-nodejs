import { StatusCodes } from "http-status-codes";
import Job from "../models/Job.model.js";

const getAllJobs = async (req, res) => {
  const {} = req.body;
};

const getSingleJob = async (req, res) => {
  res.send("get single job!");
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ message: "✅ Job successfully created!", job });
};

const updateJob = async (req, res) => {
  res.send("update a job!");
};

const deleteJob = async (req, res) => {
  res.send("delete a job!");
};

export { getAllJobs, getSingleJob, createJob, updateJob, deleteJob };
