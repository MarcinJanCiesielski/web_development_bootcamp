//jshint esversion:6
import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import ejs from "ejs";

const dbName = "userDB";
const url_mongo = "mongodb://127.0.0.1:27017/" + dbName;

const saltRounds = 11;

const app = express();
const port = 3000;
mongoose.connect(url_mongo);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", async (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  try {
    bcrypt.hash(req.body.password, saltRounds)
      .then(function (hash) {
        const newUser = User({
          email: req.body.username,
          password: hash,
      });
      newUser.save().then(savedDoc => {
        if (savedDoc === newUser) {
          res.render("secrets");
        }
      });
    });

  } catch (err) {
    console.log(err.message);
    res.render("register");
  }
});

app.post("/login", async (req, res) => {
  try {
    const loginUser = {
      email: req.body.username,
    };
    const storedUser = await User.findOne(loginUser).exec();

    bcrypt.compare(req.body.password, storedUser.password)
      .then(function (result) {
        if (result){
          res.render("secrets");
      } else {
        res.render("login");
      }
    });
  } catch (err) {
    console.log(err.message);
    res.render("login");
  }
});

app.listen(port, () => {
  console.log("App is listening on port " + port);
})
