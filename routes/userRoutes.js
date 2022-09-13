import express from "express";
import {
  addToPlaylist,
  changePassword,
  deleteMyProfile,
  deleteUser,
  forgetPassword,
  getAllUsers,
  getMyProfile,
  login,
  logout,
  register,
  removeFromPlaylist,
  resetPassword,
  updateProfile,
  updateProfilePicture,
  updateUserRole,
} from "../controllers/userController.js";
import { authorizedAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").post(logout);

router.route("/me").get(isAuthenticated, getMyProfile);

router.route("/me").delete(isAuthenticated, deleteMyProfile);

router.route("/changepassword").put(isAuthenticated, changePassword);
router.route("/updateprofile").put(isAuthenticated, updateProfile);
router
  .route("/updateprofilepicture")
  .put(isAuthenticated, singleUpload,updateProfilePicture);

router.route("/forgetpassword").post(forgetPassword);
router.route("/resetpassword/:token").put(resetPassword);

router.route("/addtoplaylist").post(isAuthenticated,addToPlaylist);

router.route("/removefromplaylist").delete(isAuthenticated,removeFromPlaylist);


router.route("/admin/getallusers").get(isAuthenticated,authorizedAdmin,getAllUsers);
router.route("/admin/user/:id").put(isAuthenticated,authorizedAdmin,updateUserRole)
                               .delete(isAuthenticated,authorizedAdmin,deleteUser)


export default router;
