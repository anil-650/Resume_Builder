-- SWITCH USER

SET ROLE dev;

-- SWITCH TO DATABASE

\c myresumebuilder;

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
