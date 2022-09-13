import express from "express";
import {
  createCourse,
  createLecture,
  deleteCourse,
  deleteLecture,
  getAllCourses,
  getCourseLecture,
} from "../controllers/courseController.js";
import {
  authorizedAdmin,
  authorizedSubscribers,
  isAuthenticated,
} from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";
const router = express.Router();

router.route("/courses").get(getAllCourses);
router
  .route("/create/course")
  .post(isAuthenticated, authorizedAdmin, singleUpload, createCourse);

router
  .route("/course/:id")
  .get(isAuthenticated, authorizedSubscribers, getCourseLecture)
  .post(isAuthenticated, authorizedAdmin, singleUpload, createLecture)
  .delete(isAuthenticated, authorizedAdmin, deleteCourse);

router
  .route("/lecture")
  .delete(isAuthenticated, authorizedAdmin, deleteLecture);

export default router;
