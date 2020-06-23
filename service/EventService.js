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
        table.increments('id').primary();
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
  switch(month){
    case 1:
      var from = '2020-01-01';
      var to = '2020-01-31';
      break;
    case 2:
      var from = '2020-02-01';
      var to = '2020-02-28';
      break;
    case 3:
      var from = '2020-03-01';
      var to = '2020-03-31';
      break;
    case 4:
      var from = '2020-04-01';
      var to = '2020-04-30';
      break;
    case 5:
      var from = '2020-05-01';
      var to = '2020-05-31';
      break;
    case 6:
      var from = '2020-06-01';
      var to = '2020-06-30';
      break;
    case 7:
      var from = '2020-07-01';
      var to = '2020-07-31';
      break;
    case 8:
      var from = '2020-08-01';
      var to = '2020-08-31';
      break;
    case 9:
      var from = '2020-09-01';
      var to = '2020-09-30';
      break;
    case 10:
      var from = '2020-10-01';
      var to = '2020-10-31';
      break;
    case 11:
      var from = '2020-11-01';
      var to = '2020-11-30';
      break;
    case 12:
      var from = '2020-12-01';
      var to = '2020-12-31';
      break;    
  }

  if(month != null){
    return sqlDb("Event")
      .limit(limit)
      .offset(offset)
      .whereBetween('date', [from, to])
      .then(data => {
        return data
      })
  }
  return sqlDb("Event")
      .limit(limit)
      .offset(offset)
      .then(data => {
        return data
      })
}

