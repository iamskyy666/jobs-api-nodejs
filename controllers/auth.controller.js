import { StatusCodes } from "http-status-codes";
import User from "../models/User.model.js";
import { BadRequestError } from "../errors/index.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const tempUser = { name, email, password: hashedPassword };
  const user = await User.create({ ...tempUser });
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.send("login user!");
};

export { register, login };
