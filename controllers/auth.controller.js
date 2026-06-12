import { StatusCodes } from "http-status-codes";
import User from "../models/User.model.js";

const register = async (req, res) => {
  // Create user
  const user = await User.create({ ...req.body });

  // Generate token - instance method on User model
  const token = user.generateJWT();

  res.status(StatusCodes.CREATED).json({
    message: "✅ User registered successfully!",
    user: { name: user.name }, // getName()
    token: token,
    error: false,
  }); // acc. to our needs (maybe the frontend needs the name and so on..)
};

const login = async (req, res) => {
  res.send("login user!");
};

export { register, login };
