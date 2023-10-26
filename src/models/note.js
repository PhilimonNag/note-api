const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is requied"],
    },
    desc: String,
    img: String,
    option: {
      type: String,
      enum: ["all", "achived", "favorite"],
      default: "all",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "userId is required"],
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);
const Note = mongoose.model("Note", NoteSchema);
module.exports = Note;
