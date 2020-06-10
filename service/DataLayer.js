let { eventsDbSetup } = require("./EventService");


const sqlDbFactory = require("knex");
let sqlDb = sqlDbFactory({
debug: true,
client: "pg",
connection: {
    host: process.env.DATABASE_URL,
    port: 5432,
    user: 'postgres',
    password: 'password'
},
ssl: true
});

function setupDataLayer() {
console.log("Setting up Data Layer");
return eventsDbSetup(sqlDb);
}

module.exports = { database: sqlDb, setupDataLayer };