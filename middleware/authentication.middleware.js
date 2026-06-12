import UnauthenticatedError from "../errors/unauthenticated.js";
import User from "../models/User.model.js";
import jwt from "jsonwebtoken";

// used in all the job-routes
const authMiddleware = async (req, res, next) => {
  // first, check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("🔴 Authentication Invalid!");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // attach the user to the job-routes

    //💡 Alternative Code (Optional.) // Common in other code-files
    // const user = User.findById(payload.id).select("-password");
    // req.user = user

    req.user = { userId: payload.userId, name: payload.name };
    next(); // important
  } catch (err) {
    console.log("ERROR:", err);
    throw new UnauthenticatedError("🔴 Authentication Invalid!");
  }
};

export default authMiddleware;
