-- PSQL SETUP
-- 2 minus in front of the line are for commenting in SQL files
-- CREATE 'dev' USER WITH CREATE DB AND CREATE ROLE

CREATE USER dev WITH PASSWORD 'dev' CREATEDB CREATEROLE;

-- SWITCH USER

SET ROLE dev;

-- CREATE DATABASE 'myresumebuilder'

CREATE DATABASE myresumebuilder;

-- SWITCH TO DATABASE

\c myresumebuilder;

-- INSTALL "uuid-ossap" for UUID gENERATION

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CREATE uuser TABLE

CREATE TABLE uuser(
        user_id UUID DEFAULT uuid_generate_v4(),
        user_name VARCHAR(255) NOT NULL,
        user_email VARCHAR(255) UNIQUE NOT NULL,
        user_password VARCHAR(255) NOT NULL,
        PRIMARY KEY(user_id)
        );

-- TEST INSERT

INSERT INTO uuser ( user_name, user_email, user_password) VALUES(
        'jay', 'jay@gmail.com', '12345'
        );

-- DISPLAY DATA

SELECT * FROM uuser;

-- IN CASE OF RUNNING A DATABASE ALREADY EITHER CHANGE CONNECTION IN THE db.js FILE OR USE THESE 3 COMMANDS.
-- \c postgres;
-- SELECT pg_terminate_backend (pid) FROM pg_stat_activity WHERE datname = '<dbname>';
-- ALTER DATABASE <dbname> RENAME TO myresumebuilder;
-- IF EVERYTHING IS SUCESSFULL YOU WILL SEE SOMETHING LIKE
-- user_id                | user_name |  user_email   | user_password
-- -----------------------------------+-----------+---------------+-------
-- ce45af6c-3fe6-4b07-b8b4-b779450f4f8a | jay       | jay@gmail.com | 12345
