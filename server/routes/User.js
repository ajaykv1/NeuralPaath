const bcrypt = require("bcrypt");
const express = require("express");
const { dbFindOne, dbInsertOne, dbUpdateOne } = require("../db");
const { verify } = require("../utils");

let router = express.Router();

router.post("/", (req, res) => {
  const token = req.header("x-access-token");
  const validateTokenPromise = verify(token);
  validateTokenPromise
    .then(async (decodedJwt) => {
      console.log("token validation successful");
      const userId = decodedJwt["sub"];
      const query = { userId: userId };
      const user = await dbFindOne(query);
      console.log("response from database dbFindOne: ", user);
      if (user) {
        const filter = { userId: userId };
        const updateDoc = {
          $set: {
            counter: user.counter + 1,
          },
        };
        const result = dbUpdateOne(filter, updateDoc);
      } else {
        console.log("Trying to insert new user");
        const doc = {
          userId: userId,
          fullName: decodedJwt["name"],
          firstName: decodedJwt["given_name"],
          lastName: decodedJwt["family_name"],
          email: decodedJwt["email"],
          picture: decodedJwt["picture"],
          counter: 1,
        };
        const result = await dbInsertOne(doc);
        console.log("Successfully created new doc", result);
      }
      res.send({ message: "Success" });
    })
    .catch((err) => {
      // TODO: only thow 401s for auth related errors
      console.log(err);
      res.status(401).send({
        message: "Unauthorized THIS IS US!",
      });
    });
});

module.exports = router;
