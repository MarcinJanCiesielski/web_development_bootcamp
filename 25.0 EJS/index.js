import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;
const app = express();
const dayOfTheWeek = new Date().getDay();
let text = "";


if (dayOfTheWeek <= 5) {
  text = "a workday so time to hard work";
} else {
  text = "the weekend so get some rest";
}

app.get("/", (req, res) => {
  res.render(__dirname + "/views/index.ejs",
    { textToShow: text });
});



app.listen(port, () => {
  console.log("Application is listening on port " + port);
});
