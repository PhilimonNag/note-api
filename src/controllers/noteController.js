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
    let option = req.query.option;
    const userId = req.userId;
    const query = { userId };

    if (option) {
      query.option = option;
    }
    const note = await Note.find(query);
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
