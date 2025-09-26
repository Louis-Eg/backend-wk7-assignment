const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
require("dotenv").config();

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: false,
  })
);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const authRoutes = require("./routes/authRoutes.js");
const protectedRoutes = require("./routes/protectedRoutes.js");

app.use("/", authRoutes);
app.use("/", protectedRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
