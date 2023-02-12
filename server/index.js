// requiring all required packages
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
const port = 3001;

//Initializing middleware
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

// Importing all backend routes
const home = require("./routes/home");
const user = require("./routes/user");

// Using routes on api call
app.use("/user", user);
app.use("/home", home);

// listenting to port
app.listen(port, () => {
  console.log("running server");
});
