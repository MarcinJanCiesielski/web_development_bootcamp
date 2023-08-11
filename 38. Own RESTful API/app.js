import express from "express";
import mongoose from "mongoose";
import ejs from "ejs";
import bodyParser from "body-parser";

const port = 3000;
const dbName = "wikiDB"
const mongo_url = "mongodb://127.0.0.1:27017/" + dbName;

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(mongo_url);

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String
});

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
  
  .get(async (req, res) => {
    let articles = [];
    try {
      articles = await Article.find().exec();
      console.log(articles);
    } catch (err) {
      console.log(err.message);
      res.send(err);
    }
    res.send(articles);
  })

  .post(async (req, res) => {
    try {
      const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
      });
      await newArticle.save();
      res.send("Successfully added a new article")
    } catch (err) {
      console.log(err.message);
      res.send(err);
    }
  })

  .delete(async (req, res) => {
    try {
      await Article.deleteMany();
      res.send("Successfully  deleted all articles");
    } catch (err) {
      console.log(err.message);
      res.send(err);
    }
  });

app.route("/articles/:articleTitle")

  .get(async (req, res) => {
    try {
      console.log(req.params.articleTitle);
      const article = await Article.findOne({ title: req.params.articleTitle });
      res.send(article);
    } catch (err) {
      console.log(err.message);
      res.send(err);
    }
  })

  .put(async (req, res) => {
    try {
      console.log(req.params.articleTitle);
      await Article.findOneAndUpdate(
        { title: req.params.articleTitle },
        { title: req.body.title, content: req.body.content },
        { overwrite: true }
      );
      res.send("Successfully updated an article");
    } catch (err) {
      console.log(err.message);
      res.send(err);
    }
  })

  .patch(async (req, res) => {
    try {
      console.log(req.body);
      await Article.findOneAndUpdate(
        { title: req.params.articleTitle },
        { $set: req.body },
      );
      res.send("Successfully updated an article");
    } catch (err) {
      console.log(err.message);
      res.send(err);
    }
  })

  .delete(async (req, res) => {
    try {
      await Article.deleteMany(
        { title: req.params.articleTitle }
      );
      res.send("Successfully deleted article");
    } catch (err) {
      res.send(err);
      console.log(err);
    }
  });

app.listen(port, () => {
  console.log("App is listening on port: " + port);
});
