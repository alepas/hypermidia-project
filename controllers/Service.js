'use strict';

var utils = require('../utils/writer.js');
var Service = require('../service/ServiceService');

module.exports.getService = function getService (req, res, next) {
  var serviceId = req.swagger.params['serviceId'].value;
  Service.getService(serviceId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getServices = function getServices (req, res, next) {
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  Service.getServices(limit,offset)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
