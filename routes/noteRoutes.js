import express from "express";
import {
  createNote,
  createNoteNotes,
  deleteNote,
  deleteNotesNote,
  getAllNotes,
  getNotesNote,
  getSingleNote,
} from "../controllers/noteController.js";

import {
  authorizedAdmin,
  authorizedSubscribers,
  isAuthenticated,
} from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";
const router = express.Router();
// isAuthenticated, authorizedAdmin,
router.route("/notes").get(getAllNotes);
router.route("/create/note").post(singleUpload, createNote);
router.route("/single/note/:id").get(getSingleNote);

// isAuthenticated, authorizedSubscribers,
// isAuthenticated, authorizedAdmin,
// isAuthenticated, authorizedAdmin,
router
  .route("/note/:id")
  .get(getNotesNote)
  .post(singleUpload, createNoteNotes)
  .delete(deleteNote);

//   isAuthenticated, authorizedAdmin,
router.route("/delnotes").delete(deleteNotesNote);

export default router;
