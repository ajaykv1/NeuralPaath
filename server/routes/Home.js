const express = require("express");
const { verify } = require("../utils");
let router = express.Router();

router.get("/unprotected", (req, res) => {
  res.send({ name: "Guest" });
});

router.get("/protected", (req, res) => {
  const token = req.header("x-access-token");
  const validateTokenPromise = verify(token);
  validateTokenPromise
    .then((out) => {
      console.log(out);
      res.send({ name: out["name"] });
    })
    .catch((err) => {
      // TODO: only thow 401s for auth related errors
      res.status(401).send({
        message: "Unauthorized!",
      });
    });
});

module.exports = router;
