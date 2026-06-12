import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

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
      validator: validator.isEmail,
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

// Mongoose middleware - hash password
// ⚠️ Don't use arrow f(x) - Scoping issues with 'this' kw.
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", UserSchema);
export default User;
