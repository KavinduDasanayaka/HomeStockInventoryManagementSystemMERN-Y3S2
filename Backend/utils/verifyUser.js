import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
import asyncHandler from "./asyncHandler.js";
import UserModel from "../models/user.model.js";

export const verifyToken = (req, res, next) => {

  const token = req.cookies.access_token;
  console.log(token)
  if (!token) return next(errorHandler(401, 'Unauthorized'));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, 'Forbidden'));

    req.user = user;
    next();
  });
};

export const authenticate = (async (req, res, next) => {
  let token;
  // Read JWT from the 'jwt' cookie
  token = req.cookies.access_token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const User = await UserModel.findById(decoded.id).select("-password");
      req.user = User;

      
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed.");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
