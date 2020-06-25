'use strict';
let sqlDb;

/**
 * Database table: Service
 **/ 
exports.ServiceDbSetup = function(connection) {
  sqlDb = connection;
  return sqlDb.schema.hasTable("Service").then(exists => {
    if (!exists) {
      console.log("Creating: Service");
      return sqlDb.schema.createTable("Service", table => {
        table.increments('id_service').primary();
        table.text("title");
        table.text("presentation");
        table.text("pratical_info");
        table.text("description");
    });
    } else 
        console.log("It exists.");
  });
};

/**
 * Database table: Service_Photo
 **/ 
exports.Service_PhotoDbSetup = function(connection) {
  sqlDb = connection;
  return sqlDb.schema.hasTable("Service_Photo").then(exists => {
      if (!exists) {
        console.log("Creating: Service_Photo");
        return sqlDb.schema.createTable("Service_Photo", table => {
          table.increments("id_service_photo").primary();
          table.foreign('id_service').references('Service.id_service');
      });
    } else 
      console.log("Exist: Event_Service");
  });
};

/**
 * Details of selected service
 * This get has the aim to retrieve the details of the selected service
 *
 * serviceId String 
 * returns List
 **/
exports.getService = function(serviceId) {
  return sqlDb("Service AS s")
      .select(['e.title', 'e.image', 'e.id_event', 'p.fullname', 'p.photo', 'p.motto', 'p.id_person', 's.title as s_title', 'sp.id_service_photo','sp.photo as sp_photo', 's.presentation', 's.pratical_info'])
      .where('s.id_service', serviceId)
      .join('Person_Service AS ps', 's.id_service','=', 'ps.id_service')
      .join('Person AS p', 'ps.id_person', '=', 'p.id_person')
      .join('Event_Service AS es', 'es.id_service','=', 's.id_service')
      .join('Event AS e', 'e.id_event','=', 'es.id_event')
      .join('Service_Photo AS sp', 's.id_service','=', 'sp.id_service')
      .then(data => {
        return data
      })
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
  return sqlDb("Service")
      .join('Service_Photo', 'Service.id_service','=', 'Service_Photo.id_service')
      .distinctOn('Service.id_service')
      .limit(limit)
      .offset(offset)
      .then(data => {
        console.log(data);
        return data
      })
}

