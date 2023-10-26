const Note = require("../models/note");

const addNote = async (req, res) => {
  try {
    let { title, desc, img } = req.body;
    const userId = req.userId;
    const note = new Note({ title, desc, img, userId });
    await note.save();
    res.status(201).json({
      status: true,
      message: `${title} added`,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

const getNote = async (req, res) => {
  try {
    const userId = req.userId;
    const note = await Note.find({ userId });
    res.status(200).json({
      status: true,
      message: `${note.length} Note founds`,
      result: note,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
module.exports = { addNote, getNote };
