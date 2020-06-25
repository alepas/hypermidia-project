'use strict';

var utils = require('../utils/writer.js');
var Information = require('../service/InformationService');

module.exports.getFaq = function getFaq (req, res, next) {
  Information.getFaq()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postForm = function postForm (req, res, next) {
  var request = req.swagger.params['request'].value;
  Information.postForm(request)
    //.then(function (response) {
    //  utils.writeJson(res, response);
    //})
    //.catch(function (response) {
    //  utils.writeJson(res, response);
    //});
};
