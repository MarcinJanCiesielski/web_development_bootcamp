import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const d = new Date();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const today = days[d.getDay()] + ", " + d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();

let taskWork = ["wtask", "wtasl2"];
let taskToday = ["task", "tasl2"];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("today.ejs", {task: taskToday, today: today});
});

app.get("/work", (req, res) => {
  res.render("work.ejs", { task: taskWork });
});

app.post("/submit", (req, res) => {
  const site = appendTask(req.body);
  switch (site) {
    case "TT":
      res.redirect("/");
      break;
    case "TW":
      res.redirect("/work");
      break;
  }
})

app.listen(port, () => {
  console.log("The application is listening on port " + port);
});

function appendTask(t) {
  const tt = t["taskToday"];
  const tw = t["taskWork"];
  if (tt) {
    taskToday.push(tt);
    return "TT";
  }
  if (tw) {
    taskWork.push(tw);
    return "TW";
  }
}
