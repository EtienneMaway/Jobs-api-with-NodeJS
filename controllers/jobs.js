const Job = require('../models/job');
const User = require('../models/users');
const { CustomAPIError, BadRequest } = require('../errors');

// Create a job for the signed-in user
const createJob = async (req, res, next) => {
  const { company, position } = req.body;

  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      throw new CustomAPIError('User not found', 400);
    }

    const job = new Job({
      company,
      position,
      createdBy: user._id,
    });

    const result = await job.save();
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// Get all jobs for the signed-in user
const getAllJobs = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      throw new CustomAPIError('User not found', 400);
    }

    const jobs = await Job.find({ createdBy: user._id });
    res.status(200).json({jobs: jobs, count: jobs.length});
  } catch (error) {
    next(error);
  }
};

// Get a specific job for the signed-in user
const getJob = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      throw new CustomAPIError('User not found', 400);
    }

    const job = await Job.findOne({ _id: id, createdBy: user._id });
    if (!job) {
      throw new CustomAPIError('Job not found', 400);
    }
    res.status(200).json({ job: job });
  } catch (error) {
    res.status(500).json({msg: `No job found with ID: ${id}`})
  }
};

// Update a specific job for the signed-in user
const updateJob = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;

  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      throw new CustomAPIError('User not found', 400);
    }

    const job = await Job.findOneAndUpdate(
      { _id: id, createdBy: user._id },
      { company, position },
      { new: true, runValidators: true}
    );
    if (!job) {
      throw new CustomAPIError('Job not found', 400);
    }
    res.status(201).json({job: job});
  } catch (error) {
    next(error);
  }
};

// Delete a specific job for the signed-in user
const deleteJob = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      throw new CustomAPIError('User not found', 400);
    }

    const job = await Job.findOneAndDelete({ _id: id, createdBy: user._id });
    if (!job) {
      throw new CustomAPIError('Job not found', 400);
    }
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
};