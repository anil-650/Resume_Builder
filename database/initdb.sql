-- PSQL SETUP
-- 2 minus in front of the line are for commenting in SQL files
-- CREATE 'dev' USER WITH CREATE DB AND CREATE ROLE

\x
CREATE USER dev WITH PASSWORD 'dev' CREATEDB CREATEROLE;

-- SWITCH USER

SET ROLE dev;

-- CREATE DATABASE 'myresumebuilder'

CREATE DATABASE myresumebuilder;

-- SWITCH TO DATABASE

\c myresumebuilder;

-- INSTALL "uuid-ossap" for UUID gENERATION

SET ROLE dev;
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

---------- -- template_data.pgsql ---------- -- 

-- SWITCH TO DATABASE

\c myresumebuilder;

-- SWITCH USER

SET ROLE dev;

-- CREATE templates TABLE

CREATE TABLE IF NOT EXISTS templates(
    name TEXT NOT NULL,
    image TEXT NOT NULL,
    text TEXT NOT NULL,
    tags TEXT[] NOT NULL,
    page TEXT NOT NULL,
    UNIQUE(image, page),
    PRIMARY KEY(name)
    );

-- TEST INSERT

INSERT INTO templates (name, image, text, tags, page)
VALUES
('ATS01', '/images/ats01.jpg', 'This is a simple ATS CV template for entry level and intermidiate level resumes', '{ats,entry-level,intermidiate-level}', '/cv-builder/templates/ats01'),
('MODERN01', '/images/modern01.jpg', 'This is a simple MODERN CV template for entry level and intermidiate level resumes', '{modern,entry-level,intermidiate-level}', '/cv-builder/templates/modern01');

-- DISPLAY DATA

SELECT * FROM templates;

---------- -- resume.pgsql -- ----------


-- SWITCH TO DATABASE

\c myresumebuilder;

-- SWITCH USER

SET ROLE dev;

-- CREATE resume TABLE
DROP TABLE IF EXISTS resumes;
CREATE TABLE resumes (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    cv_no SERIAL NOT NULL,

    user_id uuid NOT NULL,
    cv_title VARCHAR(100) NOT NULL,
    cv_objective VARCHAR(100) NOT NULL,
    cv_template VARCHAR(100) NOT NULL,
    personal JSONB NOT NULL,
    experience JSONB DEFAULT NULL,
    education JSONB NOT NULL,
    others JSONB NOT NULL,

    preview_img VARCHAR(255) DEFAULT NULL,
    pdf VARCHAR(255) DEFAULT NULL,

    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    updated_at DATE NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT fk_user_id
    FOREIGN KEY(user_id)
    REFERENCES uuser(user_id)
    ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION set_cv_no()
RETURNS TRIGGER AS $$
BEGIN
    NEW.cv_no = (SELECT COALESCE(MAX(cv_no), 0) + 1 FROM resumes WHERE user_id = NEW.user_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_DATE;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_cv_no
BEFORE INSERT ON resumes
FOR EACH ROW
    EXECUTE FUNCTION set_cv_no();

CREATE TRIGGER update_updated_at
BEFORE UPDATE ON resumes
FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

