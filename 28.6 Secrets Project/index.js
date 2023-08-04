import axios from "axios";
import express from "express";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com"

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/random");
    console.log(result.data);
    res.render("index.ejs", {
      secret: result.data["secret"],
      user: result.data["username"]
    })
  } catch (error) {
    res.render("index.ejs", {
      secret: error.message,
      user: error.message,
    });
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log("App is listening on port " + port);
});
