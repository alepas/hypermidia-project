let { eventsDbSetup } = require("./EventService");


const sqlDbFactory = require("knex");
let sqlDb = sqlDbFactory({
debug: true,
client: "pg",
connection: {
    host: process.env.DATABASE_URL,
    database: 'd30rkc6815nm22',
    port: 5432,
    user: 'tevjuzdetgjkdz',
    password: '3bf167276e24a6a03c82d2918752ffe9087abaeb6fe1a8e4c08d57943b3db7da'
},
ssl: true
});

function setupDataLayer() {
console.log("Setting up Data Layer");
return eventsDbSetup(sqlDb);
}

module.exports = { database: sqlDb, setupDataLayer };