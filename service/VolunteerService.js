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
          table.foreign('id_person').references('Person.id_person').primary();
          table.foreign('id_service').references('Service.id_service').primary();
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
  return sqlDb("Person AS p")
      .select(['e.title', 'e.image', 'e.id_event', 'p.fullname', 'p.photo', 'p.motto', 'p.email', 'p.number', 'p.description', 's.title as s_title', 's.id_service', 'sp.photo as sp_photo'])
      .where('p.id_person', volunteerId)
      .leftJoin('Person_Service AS ps', 'ps.id_person', '=', 'p.id_person')
      .leftJoin('Service AS s', 's.id_service','=', 'ps.id_service')
      .leftJoin('Event AS e', 'e.id_person','=', 'p.id_person')
      .leftJoin('Service_Photo AS sp', 's.id_service','=', 'sp.id_service')
      .distinctOn('s.id_service')
      .then(data => {
        return data
      })
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
  return sqlDb("Person")
      .limit(limit)
      .offset(offset)
      .then(data => {
        return data
      })
}

