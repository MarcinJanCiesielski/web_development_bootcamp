import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let greetings = "Enter your name, please"

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", {greetings : greetings})
});

app.post("/submit", (req, res) => {
  const nameLength = req.body["fName"].length + req.body["lName"].length;
  greetings = "There are " + nameLength + " letters in your name";
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
