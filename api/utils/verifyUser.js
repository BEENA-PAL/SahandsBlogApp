import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accesss_token;

  if (!token) {
    return next(errorHandler(401, "jwt token not found"));
  }
  jwt.verify(token, process.env.JWT_SECRETE, (err, user) => {
    if (err) {
      return next(errorHandler(401, "jwt authentication failed"));
    }
    req.user = user;
    next();
  });
};
