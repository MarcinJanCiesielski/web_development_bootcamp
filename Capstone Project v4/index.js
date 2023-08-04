import express from "express";
import axios  from "axios";

const port = 3000;
const app = express();

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const request = await axios({
      method: "get",
      url: "http://api.forismatic.com/api/1.0/",
      params: {
        method: "getQuote",
        key: "457653",
        format: "json",
        lang: "en"
      }
    });
    console.log(JSON.stringify(request.data));
    res.render("quotes.ejs", {
      quoteText: JSON.stringify(request.data.quoteText),
      quoteAuthor: JSON.stringify(request.data.quoteAuthor),
    })
  } catch (error) {
    console.log(error.message)
  }
});

app.get("/quote", (req, res) => {
  res.redirect("/");
});

app.get("/dev-quote", async (req, res) => {
  try {
    const request = await axios({
      method: "get",
      url: "https://programming-quotesapi.vercel.app/api/random",
    });
    console.log(JSON.stringify(request.data));
    res.render("quotes.ejs", {
      quoteText: JSON.stringify(request.data.quote),
      quoteAuthor: JSON.stringify(request.data.author),

    })
  } catch (error) {
    console.log(error.message)
  }
});

app.get("/meme", async (req, res) => {
  try {
    const request = await axios({
      method: "get",
      url: "https://meme-api.com/gimme",
    });
    console.log(JSON.stringify(request.data));
    res.render("meme.ejs", {
      imgLink: request.data.preview[request.data.preview.length - 1]
    })
  } catch (error) {
    console.log(error.message)
  }
})

app.listen(port, () => {
  console.log("Application is listening on port " + port);
})
