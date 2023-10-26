const express = require("express");
const app = express();
require("dotenv").config();
require("./config/db");
const fileupload = require("express-fileupload");
const router = require("./routes/route");
// const cors = require("cors");
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload());
// app.use(cors());
app.use("/api/v1", router);

app.listen(port, (err) => {
  if (err) {
    console.log(`Server failed:${err}`);
  } else {
    console.log(`Server is running at port:${port}`);
  }
});
