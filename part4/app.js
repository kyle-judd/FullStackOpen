const config = require("./utils/config");
const logger = require("./utils/logger");
const blogRouter = require("./controllers/blogs");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");

logger.info("Connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => logger.info("Successfully connected to mongoDB"))
  .catch((error) => logger.error("Error connecting to mongoDB", error.message));

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRouter);

module.exports = app;
