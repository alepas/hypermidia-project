'use strict';
let sqlDb;

/**
 * Database table: Person
 **/ 
exports.PersonDbSetup = function(connection) {
  sqlDb = connection;
  return sqlDb.schema.hasTable("Person").then(exists => {
    if (!exists) {
      console.log("Creating: Person");
      return sqlDb.schema.createTable("Person", table => {
        table.increments('id_person').primary();
        table.text("fullname");
        table.integer("number");
        table.text("email");
        table.text("photo");
        table.text("description");
        table.text("motto");
        table.foreign('id_event_type').references('Event_type.id_type');
        table.foreign('id_person').references('Person.id_volunteer');
    });
    } else 
        console.log("It exists.");
  });
};

/**
 * Database table: Person_Service
 **/ 
exports.Person_ServiceDbSetup = function(connection) {
  sqlDb = connection;
  return sqlDb.schema.hasTable("Person_Service").then(exists => {
      if (!exists) {
        console.log("Creating: Person_Service");
        return sqlDb.schema.createTable("Person_Service", table => {
          table.increments("id").primary();
          table.foreign('id_person').references('Person.id_person');
          table.foreign('id_service').references('Service.id_service');
      });
    } else 
      console.log("Exist: Event_Service");
  });
};

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

