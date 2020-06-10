'use strict';

var utils = require('../utils/writer.js');
var Volunteer = require('../service/VolunteerService');

module.exports.getVolunteer = function getVolunteer (req, res, next) {
  var volunteerId = req.swagger.params['volunteerId'].value;
  Volunteer.getVolunteer(volunteerId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getVolunteers = function getVolunteers (req, res, next) {
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  Volunteer.getVolunteers(limit,offset)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
