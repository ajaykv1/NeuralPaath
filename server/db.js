const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://neuralpaath:root_2904@cluster0.mh6gij1.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// const dbFindOne = (query) => {
//   console.log("dbFindOne called with: ", query);

//   client.connect(async (err) => {
//     if (err) {
//       console.log("Error connecting to database for findOne", err);
//     } else {
//       console.log("Connected to database successfully for findOne");
//     }

//     const collection = client.db("neuralpaath").collection("users");
//     // perform actions on the collection object
//     await collection
//       .findOne(query)
//       .then((res) => {
//         console.log("result from dbFindOne", res);

//         return res;
//       })
//       .catch((err) => console.log(err));
//     client.close();
//   });
// };

async function dbFindOne(query) {
  console.log("query: ", query);
  try {
    const database = client.db("neuralpaath");
    const users = database.collection("users");
    const user = await users.findOne(query);
    console.log(user);
    return user;
  } finally {
    // await client.close();
  }
}

async function dbInsertOne(doc) {
  console.log("new doc trying to insert: ", doc);

  try {
    const database = client.db("neuralpaath");
    const users = database.collection("users");
    const user = await users.insertOne(doc);
    console.log(`A document was inserted with the _id: ${user}`);
    return user;
  } catch (err) {
    console.log("Error occured trying to dbInsertOne: ", err);
  } finally {
    // await client.close();
  }
}

async function dbUpdateOne(filter, doc) {
  console.log("new doc trying to update: ", doc);

  try {
    const database = client.db("neuralpaath");
    const users = database.collection("users");
    const user = await users.updateOne(filter, doc);
    console.log(`A document was Updated with the _id: ${user}`);
    return user;
  } catch (err) {
    console.log("Error occured trying to dbUpdateOne: ", err);
  } finally {
    // await client.close();
  }
}

module.exports = {
  dbFindOne,
  dbInsertOne,
  dbUpdateOne,
};
