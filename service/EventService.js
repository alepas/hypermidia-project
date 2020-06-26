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
  return sqlDb("Event AS e")
      .select(['e.title', 'e.image', 'e.date', 'e.start_time', 'e.end_time', 'e.place', 'e.description', 'p.fullname', 'p.photo', 'p.motto', 'p.id_person', 's.title as s_title', 'sp.photo as sp_photo', 's.id_service'])
      .where('e.id_event', eventId)
      .join('Person AS p', 'e.id_person', '=', 'p.id_person')
      .join('Event_Service AS es', 'e.id_event','=', 'es.id_event')
      .join('Service AS s', 'es.id_service','=', 's.id_service')
      .join('Service_Photo AS sp', 's.id_service','=', 'sp.id_service')
      .distinctOn('s.id_service')
      .then(data => {
        return data
      })
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
var from;
var to;
exports.getEvents = function(limit,offset,month,topic,period) {
  if(month!=null){
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
  }

  if(month != null){
    return sqlDb("Event")
      .limit(limit)
      .offset(offset)
      .whereBetween('date', [from, to])
      .then(data => {
        return data
      })
  }else if(topic != null && period==null){
    console.log("topic yes, period no");
    return sqlDb("Event as e")
      .limit(limit)
      .offset(offset)
      .join('Event_Type as et', 'e.id_event_type', '=', 'et.id_type')
      .where('et.type', topic)
      .then(data => {
        return data
      })
  }else if(topic == null && period!=null){
    console.log("topic no, period yes");
    var date = new Date();
    var d_day = date.getDay() +1;
    var d_month = date.getMonth() +1;
    var d_year = date.getFullYear();
    var d_date;
    var d_from;
    var d_to;
    console.log("pre-date " + d_day + " " + d_month + " " + d_year);
    switch(period){
      case "Today":
        d_from = d_date;
        d_to = d_date;
        d_date = d_year + "-" + d_month + "-" + d_day;
        console.log("today " + d_date);
        break;
      case "Tomorrow":
        d_day = d_day +1;
        d_date = d_year + "-" + d_month + "-" + d_day;
        d_from = d_date;
        d_to = d_date;
        console.log("tomorrow " + d_date);
        break;
      case "In 7 days":
        d_date = d_year + "-" + d_month + "-" + d_day;
        d_from = date;
        d_day = d_day + 7;
        d_date = d_year + "-" + d_month + "-" + d_day;
        d_to = d_date;
        console.log("in 7 days " + d_date);
        break;
      case "In 1 month":
        d_date = d_year + "-" + d_month + "-" + d_day;
        d_from = date;
        d_month = d_month + 1;
        d_date = d_year + "-" + d_month + "-" + d_day;
        d_to = d_date;
        console.log("month " + d_date);
        break;
      default:
        console.log("An error occourred " + period);
    }

    return sqlDb("Event")
      .limit(limit)
      .offset(offset)
      .whereBetween('date', d_[from, d_to])
      .then(data => {
        return data
      })
    
  }else if(topic != null && period != null){
    console.log("topic yes, period yes");
    var date = new Date();
    var d_day = date.getDay() +1;
    var d_month = date.getMonth() +1;
    var d_year = date.getFullYear();
    var d_date;
    var d_from;
    var d_to;
    console.log("pre-date " + d_day + " " + d_month + " " + d_year);
    switch(period){
      case "Today":
        d_from = d_date;
        d_to = d_date;
        d_date = d_year + "-" + d_month + "-" + d_day;
        console.log("today " + d_date);
        break;
      case "Tomorrow":
        d_day = d_day +1;
        d_date = d_year + "-" + d_month + "-" + d_day;
        d_from = d_date;
        d_to = d_date;
        console.log("tomorrow " + d_date);
        break;
      case "In 7 days":
        d_date = d_year + "-" + d_month + "-" + d_day;
        d_from = date;
        d_day = d_day + 7;
        d_date = d_year + "-" + d_month + "-" + d_day;
        d_to = d_date;
        console.log("in 7 days " + d_date);
        break;
      case "In 1 month":
        d_date = d_year + "-" + d_month + "-" + d_day;
        d_from = date;
        d_month = d_month + 1;
        d_date = d_year + "-" + d_month + "-" + d_day;
        d_to = d_date;
        console.log("month " + d_date);
        break;
      default:
        console.log("An error occourred " + period);
    }

    return sqlDb("Event as e")
      .limit(limit)
      .offset(offset)
      .join('Event_Type as et', 'e.id_event_type', '=', 'et.id_type')
      .where('et.type', topic)
      .whereBetween('e.date', [d_from, d_to])
      .then(data => {
        return data
      })

  }else 
    return sqlDb("Event")
      .limit(limit)
      .offset(offset)
      .then(data => {
        return data
      })
}

