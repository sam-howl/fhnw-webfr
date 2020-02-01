const Questionnaire = require('../domain/questionnaire')

exports.findAll = (req, res) => {
  Questionnaire.find((err, questionnaires) => {
    if (err) {
      res.status(400).send("database error");
    }
    res.status(200).json(questionnaires);
  });
};

exports.findById = (req, res) => {
  Questionnaire.findById(req.params.id, (err, questionnaire) => {
    if (err) {
      res.status(400).send("database error");
    }
    res.status(200).json(questionnaire);
  });
};

exports.create = (req, res) => {
    let q = new Questionnaire();
    q.title = req.body.title;
    q.description = req.body.description;
    q.save((err, questionnaireCreated) => {
        if (err) {
            res.status(400).send(err);
          }
          res.status(200).json(questionnaireCreated);
    })
};

exports.update = (req, res) => {
  Questionnaire.findById(req.params.id, (err, questionnaire) => {
    if (err) {
      res.status(400).send("database error");
    }
    questionnaire.title = req.body.title;
    questionnaire.description = req.body.description;
    questionnaire.save((err, questionnaireUpdated) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).json(questionnaireUpdated);
    });
  });
};

exports.delete = (req, res) => {
  Questionnaire.deleteOne({ _id: req.params.id }, (err, questionnaire) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).json(questionnaire);
  });
};
