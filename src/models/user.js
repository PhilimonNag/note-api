const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "User already Exist with same Email"],
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["normal", "paid", "admin"],
      required: [true, "User role is required"],
      default: "normal",
    },
    image: String,
    point: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", function () {});
// userSchema.methods.verifyToken=function(token){
//  const verifiedtoken=jwt.verify(token,process.env.JWT_SECRET)
//  if(verifiedtoken){
//     return user._id
//  }
// }
const user = mongoose.model("users", userSchema);
module.exports = user;
