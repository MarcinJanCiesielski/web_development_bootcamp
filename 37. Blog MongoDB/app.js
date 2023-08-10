import express from "express";
import bodyParser from "body-parser";
import lodash from "lodash";
import mongoose from "mongoose";

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const dbName = "blogDB";

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/" + dbName);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
});

const Post = mongoose.model("Post", postSchema);

app.get("/", async (req, res) => {
  let posts = [];
  try {
    posts = await Post.find().exec();
  } catch (err) {
    console.log(err.message);
  }

  res.render("home.ejs", {
    homeStartingContent: homeStartingContent,
    posts: posts,
  });
});

app.get("/about", (req, res) => {
  res.render("about.ejs", {
    aboutContent: aboutContent,
  })
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs", {
    contactContent: contactContent
  })
})

app.get("/compose", (req, res) => {
  res.render("compose.ejs");
})

app.post("/createPost", (req, res) => {
  try {
    const post = new Post({
      title: req.body.newPostTitle,
      content: req.body.newPostContent
    });

    post.save();
  } catch (err) {
    console.log(err.message);
  }
  
  res.redirect("/");
})

app.get("/posts/:postTitle", async (req, res) => {
  res.render("post.ejs", {
    post: await postCheck(req.params.postTitle),
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

async function postCheck(title) {
  let posts = [];
  try {
    posts = await Post.find().exec();
  } catch (err) {
    console.log(err.message);
  }

  for (let post of posts) {
    if (lodash.lowerCase(post.title) === lodash.lowerCase(title)) {
      return post;
    }
  }
  return null;
}
