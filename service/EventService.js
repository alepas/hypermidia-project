'use strict';
let sqlDb;

/**
 * Database table: Event
 **/ 
exports.EventDbSetup = function(s) {
  sqlDb = s;
  return sqlDb.schema.hasTable("Event").then(exists => {
    if (!exists) {
      console.log("Creating: Event");
      return sqlDb.schema.createTable("Event", table => {
        table.increments('id_event').primary();
        table.text("title");
        table.text("date");
        table.text("description");
        table.text("image");
        table.text("place");
        table.foreign('id_event_type').references('Event_Type.id_type');
        table.foreign('id_person').references('Person.id_person');
    });
    } else 
        console.log("It exists.");
  });
};

/**
 * Database table: Event_Type
 **/ 
exports.Event_TypeDbSetup = function(connection) {
  sqlDb = connection;
  return sqlDb.schema.hasTable("Event_Type").then(exists => {
      if (!exists) {
        console.log("Creating: Event_Type");
        return sqlDb.schema.createTable("Event_Type", table => {
          table.increments('id_type').primary();
          table.text("type");
      });
    } else 
      console.log("Exist: Event_Type");
  });
};

/**
 * Database table: Event_Service
 **/ 
exports.Event_ServiceDbSetup = function(connection) {
  sqlDb = connection;
  return sqlDb.schema.hasTable("Event_Service").then(exists => {
      if (!exists) {
        console.log("Creating: Event_Service");
        return sqlDb.schema.createTable("Event_Service", table => {
          table.foreign('id_event').references('Event.id_event');
          table.foreign('id_service').references('Service.id_service');
      });
    } else 
      console.log("Exist: Event_Service");
  });
};
  
/**
 * Details of selected event
 * This get has the aim to retrieve the details of the selected event
 *
 * eventId String 
 * returns List
 **/
exports.getEvent = function(eventId) {
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
 * Get all events
 * This get has the aim to retrieve all events that the association has programmed
 *
 * limit Integer max number of items per page (optional)
 * offset Integer Pagination offset, default 0 (optional)
 * month BigDecimal Filter by month (optional)
 * returns List
 **/
exports.getEvents = function(limit,offset,month) {
  return sqlDb("Event")
    .limit(limit)
    .offset(offset)
    .month(month)
    .them(data => {
      return data
    })
  /*return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "photo" : { },
  "id" : 0,
  "eventType" : "eventType",
  "title" : "Titolo evento"
}, {
  "photo" : { },
  "id" : 0,
  "eventType" : "eventType",
  "title" : "Titolo evento"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });*/
}

