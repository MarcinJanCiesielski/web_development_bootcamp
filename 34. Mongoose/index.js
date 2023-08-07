import { mongoose } from "mongoose";

const dbName = 'fruitsDB'
const uri = "mongodb://127.0.0.1:27017/" + dbName;

try {
  const client = mongoose.connect(uri);
} catch (error) {
  console.log(error.message);
}


// schemat obiektów
const fruitSchema = new mongoose.Schema({
  name: {type: String, required: [true, "No name specified"]},
  rating: { type: Number, min: 1, max: 10 },
  review: String,
});

//definiujemy mode -> mongoose zmiany to w kolekcję fruits i jej schemat
const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  name: "Watermelon",
  rating: 8,
  review: "So juicy"
});
//await fruit.save();

const personSchema = mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit:  fruitSchema,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "Amy",
  age: 12,
  favoriteFruit: fruit,
})

//await person.save()

const orange = new Fruit(
      {
        name: "Orange",
        score: 6,
        review: "Kinda sour"
  }
)
const banana = new Fruit(
  {
    name: "Banana",
    score: 9,
    review: "Great Stuff!"
  }
);

const kiwi = new Fruit(
  {
    name: "Kiwi",
    score: 10,
    review: "The best fruit"
  }
);

// Fruit.insertMany([kiwi, orange, banana]);

//await Fruit.updateOne({ name: 'Pineapple' }, { name: "Pineapple2" });

//await Fruit.deleteOne({ name: "Pineapple" });

//await Person.deleteMany({ name: "John" });

//await Person.updateOne({ name: "John" }, { favoriteFruit: fruit });

const cursor = Fruit.find().cursor();

for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
  console.log(doc.name);
}

await mongoose.connection.close();
