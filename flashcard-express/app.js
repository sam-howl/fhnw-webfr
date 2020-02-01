//const http = require('http');
const log4js = require("log4js");
const dotenv = require("dotenv-extended");
const express = require("express");
const mongoose = require("mongoose");
const dispatcher = require('./web/dispatcher');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

log4js.configure("log4js.json");
const logger = log4js.getLogger("server");

// Read the properties from file '.env' and '.env.defaults'
dotenv.load({ silent: true });
const PORT = process.env.PORT || 9090;

// Datenbankverbindung
mongoose.Promise = global.Promise;
const url =
  "mongodb://" + process.env.MONGO_HOST + "/" + process.env.MONGO_DATABASE;
  logger.info(`${url}`)
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.json())
app.use(cors())

app.use('/flashcard-express', dispatcher);

app.listen(PORT, () => logger.info(`Server running on ${PORT}`));