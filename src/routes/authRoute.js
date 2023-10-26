const express = require("express");
const router = express.Router();
const { signUp, signIn, verify } = require("../controllers/authControllers");
const verifyAuth = require("../middlewares/authJWT");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/user", verifyAuth, verify);
module.exports = router;
