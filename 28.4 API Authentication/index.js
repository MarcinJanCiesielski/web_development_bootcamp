import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "user456_321";
const yourPassword = "haslo456";
const yourAPIKey = "ce94b8fe-2a93-42a5-a35d-8dc0970fc336";
const yourBearerToken = "9733b29e-bebe-4c86-bc84-9c75f00f8749";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    console.log(response.data);
    const result = JSON.stringify(response.data);
    console.log(">>>result: " + result);
    res.render("index.ejs", {
      content: result
    }); 
  } catch (error) {
    console.log("Failed to make request:", error.message);
    res.render("index.ejs", {
      content: error.message
    });
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/all?page=1", {
      auth:
      {
        username: yourUsername,
        password: yourPassword
      }
    });

    const result = JSON.stringify(response.data);

    res.render("index.ejs", {
      content: result
    })

  } catch (error) {
    console.log(error.message);
    res.render("index.ejs", {
      content: error.message
    });
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const score = 5;
    const request = await axios.get(`https://secrets-api.appbrewery.com/filter`, {
      params: {
        score: score,
        apiKey: yourAPIKey
      }
    });
    const response = JSON.stringify(request.data);
    res.render("index.ejs", {
      content: response
    });
  } catch (error) {
    console.log(error.message);
    res.render("index.ejs", {
      content: error.message
    });
  }
});

app.get("/bearerToken", async (req, res) => {
  try {
    const id = 42;
    const request = await axios.get(`https://secrets-api.appbrewery.com/secrets/${id}`, {
      headers: {
        Authorization: "Bearer " + yourBearerToken
      }
    });
    const result = JSON.stringify(request.data);

    res.render("index.ejs", {
      content: result
    })
  } catch (error) {
    console.log(error.message);
    res.render("index.ejs", {
      content: error.message
    })
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
