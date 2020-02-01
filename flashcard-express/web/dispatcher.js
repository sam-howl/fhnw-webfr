const express = require('express');
const dispatcher = express.Router();
const controller = require('./questionnaire-controller')

dispatcher.route('/questionnaires').get(controller.findAll)
dispatcher.route('/questionnaires/:id').get(controller.findById)
dispatcher.route('/questionnaires/:id').put(controller.update)
dispatcher.route('/questionnaires').post(controller.create)
dispatcher.route('/questionnaires/:id').delete(controller.delete)

module.exports = dispatcher;