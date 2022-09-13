import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "./catchAsyncError.js";
export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  console.log(req)

  if (!token) return next(new ErrorHandler("Not Logged In", 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded._id);

  next();
});

export const authorizedAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(
      new ErrorHandler(
        `${req.user.role} is not authorized to access this resourse`,
        403
      )
    );
  }
  next();
};

export const authorizedSubscribers = (req, res, next) => {
  if (req.user.subscription !== "active" && req.user.role !== "admin") {
    return next(
      new ErrorHandler(`Only Subscribers can access this resourse`, 403)
    );
  }
  next();
};
