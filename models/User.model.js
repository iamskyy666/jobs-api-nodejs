import mongoose, { Schema } from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
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

//! Mongoose Middleware - Hash Password 🟢
// ⚠️ Don't use arrow f(x) - Scoping issues with 'this' kw.
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Instance Method 🟢
// example - get user name
// UserSchema.methods.getName = function () {
//   return this.name;
// };

//! Generate Token - Instance Method 🟢
UserSchema.methods.generateJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME },
  ); // userId, jobId - better naming convention, less confusing than user._id or job._id
};

const User = mongoose.model("User", UserSchema);
export default User;
