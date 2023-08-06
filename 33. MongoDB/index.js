import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);
const dbName = 'fruitsDB'

async function run() {
  try {
    const database = client.db(dbName);
    const fruits = database.collection("fruits");
    const docs = [
      {
        name: "Apple",
        score: 8,
        review: "Great fruit"
      },
      {
        name: "Orange",
        score: 6,
        review: "Kinda sour"
      },
      {
        name: "Banana",
        score: 9,
        review: "Great Stuff!"
      }
    ];

    const options = { ordered: true };
    //const result = await fruits.insertMany(docs);
    //console.log(`${result.insertedCount} documents were inserted`);

  } finally {
    await client.close();
  }
}
run().catch(console.dir);
