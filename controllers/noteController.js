import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Notes } from "../models/nodeModel.js";
import getdataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";
export const getAllNotes = catchAsyncError(async (req, res, next) => {
  const notes = await Notes.find().select("-notes");
  res.status(200).json({
    success: true,
    notes,
  });
});
export const getSingleNote = catchAsyncError(async (req, res, next) => {
  const notes = await Notes.findById(req.params.id);
  res.status(200).json({
    success: true,
    notes,
  });
});
export const createNote = catchAsyncError(async (req, res, next) => {
  const { title, description, createdBy } = req.body;

  if (!title || !description || !createdBy) {
    return next(new ErrorHandler("Please add all fields", 400));
  }

  const file = req.file;
  const fileUri = getdataUri(file);

  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  const note = await Notes.create({
    title,
    description,
    createdBy,
    poster: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
    user:req.user.id
  });
  res.status(200).json({
    success: true,
    message: "Note created successfully",
    note,
  });
});

export const getNotesNote = catchAsyncError(async (req, res, next) => {
  const note = await Notes.findById(req.params.id);
  if (!note) {
    return next(new ErrorHandler("Note not found", 404));
  }
  await note.save();

  res.status(200).json({
    success: true,
    notes: note.notes,
  });
});

export const createNoteNotes = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { title } = req.body;
  const note = await Notes.findById(id);
  if (!note) {
    return next(new ErrorHandler("Note not found", 404));
  }
  const file = req.file;
  const fileUri = getdataUri(file);

  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  note.notes.push({
    title,
    docFile: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });
  await note.save();
  res.status(200).json({
    success: true,
    message: "Note Added successfully",
    note,
  });
});

export const deleteNote = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const note = await Notes.findById(id);
  if (!note) {
    return next(new ErrorHandler("Note not found", 404));
  }
  await cloudinary.v2.uploader.destroy(note.poster.public_id);

  for (let i = 0; i < note.notes.length; i++) {
    const element = note.notes[i];
    await cloudinary.v2.uploader.destroy(element.docFile.public_id);
  }
  await note.remove();
  res.status(200).json({
    success: true,
    message: "Note deleted successfully",
  });
});

export const deleteNotesNote = catchAsyncError(async (req, res, next) => {
  const { noteId, notesId } = req.query;

  const note = await Notes.findById(noteId);
  if (!note) {
    return next(new ErrorHandler("Note not found", 404));
  }
  const notes = note.notes.find((item) => {
    if (item._id.toString() === notesId.toString()) return item;
  });
  await cloudinary.v2.uploader.destroy(notes.docFile.public_id);

  note.notes = note.notes.filter((item) => {
    if (item._id.toString() !== notesId.toString()) return item;
  });

  await note.save();
  res.status(200).json({
    success: true,
    message: "Note deleted successfully",
  });
});
