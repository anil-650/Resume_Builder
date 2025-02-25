const { Pool } = require("pg");

var conoptions = {
user: process.env.DB_USER || "dev",
password: process.env.DB_PASS || "dev",
host: process.env.DB_HOST || "localhost",
port: process.env.DB_PORT || "5432",
database: process.env.DB_NAME || "myresumebuilder"
}

// const connectionString = process.env.DB_URL || 'postgresql://dev:dev@localhost:5432/myresumebuilder'

const pool = new Pool(conoptions);

module.exports = pool;
