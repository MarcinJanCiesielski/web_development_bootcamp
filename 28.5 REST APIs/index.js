import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

const yourBearerToken = "9733b29e-bebe-4c86-bc84-9c75f00f8749";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    console.log(error.message);
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  try {
    const data = {
    secret: req.body.secret,
    score: req.body.score,
    };
    const request = await axios.post(API_URL + '/secrets', data, config);
    const result = JSON.stringify(request.data);
    console.log(result);
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.log(error.message);
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/put-secret", async (req, res) => {
  try {
    const searchId = req.body.id;
    const data = {
      secret: req.body.secret,
      score: req.body.score,
    };
    const request = await axios.put(API_URL + "/secrets/" + searchId, data, config);
    const result = JSON.stringify(request.data);
    console.log(result);

    res.render("index.ejs", { content: result });
  } catch (error) {
    console.log(error.message);
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/patch-secret", async (req, res) => {
  try {
    const searchId = req.body.id;
    const data = {
      secret: req.body.secret,
      score: req.body.score
    }

    const request = await axios.patch(API_URL + /secrets/ + searchId, data, config);
    const result = JSON.stringify(request.data);

    res.render("index.ejs", { content: result });
  } catch (error) {
    console.log(error.message);
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/delete-secret", async (req, res) => {
  try {
    const searchId = req.body.id;
    const request = await axios.delete(API_URL + /secrets/ + searchId, config);
    const result = JSON.stringify(request.data);

    res.render("index.ejs", { content: result });
  } catch (error) {
    console.log(error.message);
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
