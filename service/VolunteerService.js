'use strict';


/**
 * Details of selected Volunteer
 * This get has the aim to retrieve the details of the selected volunteer
 *
 * volunteerId String 
 * returns List
 **/
exports.getVolunteer = function(volunteerId) {
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
 * Get all volunteers
 * This get has the aim to retrieve all volunteers that the association has programmed
 *
 * limit Integer max number of items per page (optional)
 * offset Integer Pagination offset, default 0 (optional)
 * returns List
 **/
exports.getVolunteers = function(limit,offset) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "motto" : "motto",
  "photo" : { },
  "id" : 0,
  "fullname" : "Nome Cognome"
}, {
  "motto" : "motto",
  "photo" : { },
  "id" : 0,
  "fullname" : "Nome Cognome"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

