const router = require("express").Router();
const { addNote, getNote } = require("../controllers/noteController");
router.route("/").get(getNote).post(addNote);
module.exports = router;
