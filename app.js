const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const connectToDb = require("./mogodbconnect/connectToDb");
const indexRouter = require("./routes/index");
const utilHelpers = require("./helpers/util.helper");
const app = express();

//Connect to MongoDb:
connectToDb.connect();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Init root routes:
app.use("/charity", indexRouter);

//Catch 404 and forward to error handler
app.use((err, req, res, next) => {
  console.log("Error", err.message);
  return utilHelpers.sendResponse(
    res,
    err.statusCode ? err.statusCode : 500,
    false,
    null,
    [{ message: err.message }],
    null
  );
});

module.exports = app;
