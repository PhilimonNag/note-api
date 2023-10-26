const router = require("express").Router();
const noteRouter = require("./noteRoute");
const authRouter = require("./authRoute");
const verifyAuth = require("../middlewares/authJWT");

router.use("/auth", authRouter);
router.use("/note", verifyAuth, noteRouter);

module.exports = router;
