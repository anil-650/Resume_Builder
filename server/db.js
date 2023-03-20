const { Pool } = require("pg");

const pool = new Pool({
    user: "dev",
    password: "dev",
    host: "localhost",
    port: "5432",
    database: "myresumebuilder"
});

module.exports = pool;
