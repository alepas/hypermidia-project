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
  return sqlDb("Service")
      .join('Service_Photo', 'Service.id_service','=', 'Service_Photo.id_service')
      .groupBy('id_service')
      .first('title', 'photo', 'id_service')
      .limit(limit)
      .offset(offset)
      .then(data => {
        return data
      })
}

