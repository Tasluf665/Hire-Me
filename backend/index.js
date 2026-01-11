const dotenv = require('dotenv');

// Load env vars
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: envFile });

const config = require("config");

const Joi = require("joi");

const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const error = require("./middleware/error");
const users = require("./routes/users");

const app = express();
const port = process.env.PORT || 3001;

app.set("view engine", "ejs");

// Check for the presence of critical configuration variables. Source: Mosh -> NodeJS course -> 5. Express -> 7 - Configuration and 10. Authentication -> 10- Storing Secrets
if (!config.get("JWT_PRIVATE_KEY") || !config.get("MONGODB_URL")) {
  console.error("FATAL ERROR: JWT_PRIVATE_KEY or MONGODB_URL is not define");
  process.exit(1);
}

mongoose.connect(`${config.get("MONGODB_URL")}`)
  .then(() => console.log("Connected with MongoDB")) // Connection success message.
  .catch((err) => console.log("Could not connect to MongoDB", err)); // Connection error handling.

app.use(express.json()); // Parse JSON data in request bodies.
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data in request bodies.
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.use("/api/users", users);

app.use(error);

app.get("/test", (req, res) => {
  res.send("API is working");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
