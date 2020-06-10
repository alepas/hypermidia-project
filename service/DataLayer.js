let { eventsDbSetup } = require("./EventService");


const sqlDbFactory = require("knex");
let sqlDb = sqlDbFactory({
debug: true,
client: "pg",
connection: process.env.DATABASE_URL,
ssl: true
});

function setupDataLayer() {
console.log("Setting up Data Layer");
return eventsDbSetup(sqlDb);
}

module.exports = { database: sqlDb, setupDataLayer };