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

router.route("/notes").get(getAllNotes);
router
  .route("/create/note")
  .post(isAuthenticated, authorizedAdmin, singleUpload, createNote);
router.route("/single/note/:id").get(getSingleNote);

// isAuthenticated, authorizedSubscribers,
router
  .route("/note/:id")
  .get(isAuthenticated,getNotesNote)
  .post(isAuthenticated, authorizedAdmin, singleUpload, createNoteNotes)
  .delete(isAuthenticated, authorizedAdmin, deleteNote);

router
  .route("/delnotes")
  .delete(isAuthenticated, authorizedAdmin, deleteNotesNote);

export default router;
