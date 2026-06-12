const getAllJobs = async (req, res) => {
  res.send("get all jobs!");
};

const getSingleJob = async (req, res) => {
  res.send("get single job!");
};

const createJob = async (req, res) => {
  res.json(req.user);
};

const updateJob = async (req, res) => {
  res.send("update a job!");
};

const deleteJob = async (req, res) => {
  res.send("delete a job!");
};

export { getAllJobs, getSingleJob, createJob, updateJob, deleteJob };
