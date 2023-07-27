//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;
const app = express();
let userAuthorized = false;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(passwordCheck);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  if (userAuthorized) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log("Application listens on port " + port);
});

function passwordCheck(req, res, next) {
  if (req.body["password"] === "ILoveProgramming") {
    userAuthorized = true;
  } else {
    userAuthorized = false;
  }
  next();
}
