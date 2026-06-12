import { StatusCodes } from "http-status-codes";
import User from "../models/User.model.js";
import BadRequestError from "../errors/bad-request.js";
import UnauthenticatedError from "../errors/unauthenticated.js";

/**
 * @desc    Register a new user account
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
const register = async (req, res) => {
  // Create user document
  // Password hashing is handled automatically
  // by the User model's pre("save") middleware
  const user = await User.create({ ...req.body });

  // Generate JWT for immediate authentication
  // after successful registration
  const token = user.generateJWT();

  res.status(StatusCodes.CREATED).json({
    message: "✅ User registered successfully!",
    user: {
      name: user.name,
    },
    token,
    error: false,
  });
};

/**
 * @desc    Authenticate an existing user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate required credentials
  if (!email || !password) {
    throw new BadRequestError("🔴 Please provide valid credentials..!");
  }

  // Find user by email address
  const user = await User.findOne({ email });

  // Do not reveal whether email exists
  // Return generic authentication error
  if (!user) {
    throw new UnauthenticatedError("🔴 Invalid credentials!");
  }

  // Compare incoming password with
  // hashed password stored in database
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("🔴 Invalid credentials!");
  }

  // Generate new JWT after successful login
  const token = user.generateJWT();

  res.status(StatusCodes.OK).json({
    message: "✅ Logged-In successfully!",
    user: {
      name: user.name,
    },
    token,
    error: false,
  });
};

export { register, login };
