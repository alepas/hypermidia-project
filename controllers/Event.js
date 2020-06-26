'use strict';

var utils = require('../utils/writer.js');
var Event = require('../service/EventService');

module.exports.getEvent = function getEvent (req, res, next) {
  var eventId = req.swagger.params['eventId'].value;
  Event.getEvent(eventId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getEvents = function getEvents (req, res, next) {
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  var month = req.swagger.params['month'].value;
  var topic = req.swagger.params['topic'].value;
  var period = req.swagger.params['period'].value;
  Event.getEvents(limit,offset,month,topic,period)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
