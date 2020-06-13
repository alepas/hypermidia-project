let { EventDbSetup, Event_TypeDbSetup, Event_ServiceDbSetup } = require("./EventService");
let { ServiceDbSetup, Service_PhotoDbSetup } = require("./ServiceService");
let { IssuesDbSetup, FaqDbSetup } = require("./InformationService");
let { PersonDbSetup, Person_ServiceDbSetup } = require("./VolunteerService");

const sqlDbFactory = require("knex");
let sqlDb = sqlDbFactory({
debug: true,
client: "pg",
connection: process.env.DATABASE_URL,
ssl: true
});

function setupDataLayer() {
console.log("Setting up Data Layer");
return EventDbSetup(sqlDb);
       //Event_TypeDbSetup(sqlDb),
       //Event_ServiceDbSetup(sqlDb),
       //ServiceDbSetup(sqlDb),
       //Service_PhotoDbSetup(sqlDb),
       //IssuesDbSetup(sqlDb),
       //FaqDbSetup(sqlDb)//,
       //PersonDbSetup(sqlDb),
       //Person_ServiceDbSetup(sqlDb)
       
}

module.exports = { database: sqlDb, setupDataLayer };