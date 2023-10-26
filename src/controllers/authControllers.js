const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new userModel({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
    });
    await newUser.save();
    const token = jwt.sign({ payload: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    res.status(200).send({
      success: true,
      message: "Sign Up succesfull",
      accessToken: token,
    });
  } catch (error) {
    if (error.name === "ValidationError")
      res.status(400).send({
        success: false,
        message: error.message,
      });
    else if (error.code == 11000)
      res.status(400).send({
        success: false,
        message: "Email Already Exist",
      });
    else
      res.status(500).send({
        success: false,
        message: error.message,
      });
  }
};
const signIn = async (req, res) => {
  try {
    if (!req.body.hasOwnProperty("email")) {
      res.status(400).send({
        success: false,
        message: "Email is required",
      });
    } else if (!req.body.hasOwnProperty("password")) {
      res.status(400).send({
        success: false,
        message: "Password is required",
      });
    } else {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });
      if (user) {
        const verify = await bcrypt.compare(password, user.password);
        if (verify) {
          const token = jwt.sign({ payload: user.id }, process.env.JWT_SECRET, {
            expiresIn: "15m",
          });
          user.password = undefined;
          res.status(200).send({
            success: true,
            message: "Loging Successfully",
            accessToken: token,
          });
        } else {
          res.status(401).send({
            success: false,
            message: "Invalid Email and Password",
          });
        }
      } else {
        res
          .status(400)
          .send({ success: false, message: "Invalid Email and Password" });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
};
const verify = async (req, res) => {
  const userId = req.userId;
  let user = await userModel.findById(userId);
  user.password = undefined;

  res.send({
    success: true,
    // accessToken: req.token,
    message: "Login Sucess Full",
    result: user,
  });
};

module.exports = { signUp, signIn, verify };
