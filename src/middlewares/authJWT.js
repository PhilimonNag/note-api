const userModel = require("../models/user");
const jwt = require("jsonwebtoken");

const verifyAuth = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization;
    try {
      const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
      if (verifyToken) {
        if (verifyToken.exp < Date.now() / 1000) {
          res.status(400).send({ message: "Token Expired Sing In again!" });
        } else {
          const user = await userModel.findById({ _id: verifyToken.payload });
          if (user) {
            req.userId = user._id;
            req.role = user.role;
            req.token = token;
            next();
          } else {
            res.status(400).send({ message: "Token varification failed" });
          }
        }
      } else {
        res.status(400).send({ message: "Token varification failed" });
      }
    } catch (error) {
      res.status(401).send({ message: "accessToken is expired" });
    }
  } else {
    res.status(401).send({ message: "accessToken is missing" });
  }
};
module.exports = verifyAuth;
