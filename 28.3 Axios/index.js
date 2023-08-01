import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {error: error.message});
  }
});

app.post("/", async (req, res) => {
  const request = buildRequest(req.body);
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/filter" + request);
    let result = response.data;

    if (result.length > 1) {
      result = result[Math.floor(Math.random() * result.length)]
    }

    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {error: error.message});
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});


function buildRequest(body) {
  let request = '';

  if (body.type.length > 0 || body.participants.length > 0) {
    request = "?"
    if (body.type.length > 0) request = request + "type=" + body.type;
    if (body.participants.length > 0) request = request + "&participants=" + body.participants;
    
    console.log(request);
  }
  return request;
}
