//jshint esversion:6

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import lodash from "lodash";
import secrets from "../secrets.json"  assert { type: 'json' };

const app = express();
const dbName = 'todolistDB';

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const mongoDBLocal = "mongodb://127.0.0.1:27017/" + dbName;

const mongoDBAtlasCloudUser = secrets["mongo_db_cloud_user"];
const mongoDBAtlasCloudPassword = secrets["mongo_db_cloud_password"];
const mongoDBAtlasCloud = `mongodb+srv://${mongoDBAtlasCloudUser}:${mongoDBAtlasCloudPassword}@cluster0.scvae0n.mongodb.net/${dbName}`;

mongoose.connect(mongoDBAtlasCloud);

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Item = new mongoose.model("Item", itemSchema);

const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [itemSchema],
});

const List = new mongoose.model("List", listSchema);

const task1 = new Item({ name: "Welcome to your todolist!" });
  const task2 = new Item({ name: "Hit the + button to add a new item" });
  const task3 = new Item({ name: "<-- Hit this to delete an item" });

const defaultItems = [task1, task2, task3];
  
async function  createDefaultItems() {

  await Item.insertMany(defaultItems).then(function(){
      console.log("Successfully saved into our DB.");
    })
    .catch(function(err){
      console.log(err);
    });
}


app.get("/", async function(req, res) {

  const items = await Item.find({}).exec();
  if (items.length === 0) {
    await createDefaultItems();
    res.redirect("/")
  }

  res.render("list", {listTitle: "Today", newListItems: items});

});

app.post("/", async function(req, res){
  const newItemName = req.body.newItem;
  const listName = req.body.list;

  const newItem = new Item({ name: newItemName });

  if (listName === "Today") {
    await newItem.save();

    res.redirect("/");
  } else {
    let foundList = await List.findOne({ name: listName }).exec();

    if (foundList) {
      console.log(">>>FOUND")
      await foundList.items.push(newItem);
      await foundList.save();

      res.redirect("/" + listName);
    }
  }
});

app.post("/delete", async (req, res) => {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;
  if (listName === "Today") {
    await Item.findByIdAndRemove(checkedItemId);
    res.redirect("/");
  } else {
    await List.findOneAndUpdate(
      {
        name: listName,
      },
      {$pull: {items: {_id: checkedItemId}}}
    );
    res.redirect("/" + listName);
  }
  

  
})

app.get("/:customListName", async function(req,res){
  const customListName = lodash.capitalize(req.params.customListName);

  const foundList = await List.findOne({ name: customListName }).exec();
  if (!foundList) {
    const newList = new List({
      name: customListName,
      items: defaultItems,
    });

    await newList.save();

    res.redirect("/" + customListName);
  } else {
    res.render("list.ejs", {
      listTitle: foundList.name,
      newListItems: foundList.items,
    });
  }
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
