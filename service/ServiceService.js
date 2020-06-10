'use strict';


/**
 * Details of selected service
 * This get has the aim to retrieve the details of the selected service
 *
 * serviceId String 
 * returns List
 **/
exports.getService = function(serviceId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ "", "" ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all services
 * This get has the aim to retrieve all services that the association has programmed
 *
 * limit Integer max number of items per page (optional)
 * offset Integer Pagination offset, default 0 (optional)
 * returns List
 **/
exports.getServices = function(limit,offset) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "photo" : { },
  "id" : 0,
  "title" : "Nome servizio"
}, {
  "photo" : { },
  "id" : 0,
  "title" : "Nome servizio"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

