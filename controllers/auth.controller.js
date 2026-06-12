import { StatusCodes } from "http-status-codes";
import User from "../models/User.model.js";
import BadRequestError from "../errors/bad-request.js";
import UnauthenticatedError from "../errors/unauthenticated.js";

const register = async (req, res) => {
  // Create user
  const user = await User.create({ ...req.body });

  // Generate token - instance method on User model
  const token = user.generateJWT();

  res.status(StatusCodes.CREATED).json({
    message: "✅ User registered successfully!",
    user: { name: user.name },
    token: token,
    error: false,
  }); // acc. to our needs (maybe the frontend needs the name and so on..)
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("🔴 Please provide valid credentials..!");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("🔴 Invalid credentials.. Try again!");
  }

  // compare password
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("🔴 Invalid credentials!");
  }

  const token = user.generateJWT();
  res.status(StatusCodes.OK).json({
    message: "✅ Logged-In successfully!",
    user: { name: user.name },
    token,
    error: false,
  });
};

export { register, login };
