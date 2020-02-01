//const http = require('http');
const log4js = require("log4js");
const dotenv = require("dotenv-extended");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Questionnaire = require('./domain/questionnaire');

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

app.get("/", (req, res) => {
    let logger = log4js.getLogger("app");
    Questionnaire.find((err, questionnaires) => {
        if (err) {
            res.status(400).send('database error');
        }
        logger.debug(`Found ${questionnaires.length} questionnaire`)
        res.status(200).json(questionnaires)
        });
});

app.listen(PORT, () => logger.info(`Server running on ${PORT}`));