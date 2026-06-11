import mongoose, { Schema } from "mongoose";
import { isEmail } from "validator";

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide name!"],
    minLength: 3,
    maxLength: 40,
  },
  email: {
    type: String,
    required: [true, "Please provide email!"],
    minLength: 3,
    maxLength: 40,
    validate: {
      validator: isEmail,
      message: "Please provide a valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    minLength: 8,
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
