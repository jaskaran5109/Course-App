import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter course title"],
    minLength: [4, "Title must be at least 4 characters"],
    maxLength: [80, "Title can't exceed 80 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter description"],
    minLength: [10, "Description must be at least 10 characters"],
  },
  notes: [
    {
      title: {
        type: String,
        required: true,
      },
      docFile: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    },
  ],
  poster: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  createdBy: {
    type: String,
    required: [true, "Enter Note Creator Name"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Notes = mongoose.model("Note", schema);
