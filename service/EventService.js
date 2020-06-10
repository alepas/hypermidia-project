'use strict';
let sqlDb;


exports.eventsDbSetup = function(s) {
  sqlDb = s;
  console.log("Checking if events table exists");
  return sqlDb.schema.hasTable("Event").then(exists => {
    if (!exists) {
      console.log("It doesn't so we create it");
      return sqlDb.schema.createTable("Event", table => {
        table.increments('id_event').primary();
        table.text("title");
        table.text("date");
        table.text("description");
        table.text("image");
        table.text("place");
        //table.foreign('id_event_type').references('id_type').inTable('Event_type');
        //table.foreign('id_person').references('id_volunteer').inTable('Person');
    });
    } else {
    console.log("It exists.");
    }
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
      return data.map(e => {
        e.photo = e.image;
        e.id = e.id_event;
        return e;
      })
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

