const mongoose = require("mongoose");
let dbUrl = require("./config").DB_URL;
const connect = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("DB connected Successfully");
  } catch (error) {
    console.log("Db connection Failed");
    console.log(error);
  }
};
connect();
