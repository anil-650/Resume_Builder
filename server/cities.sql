DROP TABLE IF EXISTS cities;
CREATE TABLE cities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  state_id INTEGER NOT NULL,
  state_code VARCHAR(255) NOT NULL,
  state_name VARCHAR(255) NOT NULL,
  country_id INTEGER NOT NULL,
  country_code CHAR(2) NOT NULL,
  country_name VARCHAR(255) NOT NULL,

  latitude DECIMAL(10,8) NOT NULL,
  longitude DECIMAL(11,8) NOT NULL,

  wikiDataId VARCHAR(255) DEFAULT NULL
);

COPY cities FROM 'cities.csv' DELIMITER',' CSV HEADER;

CREATE INDEX name_idx ON cities (name);
CREATE INDEX state_idx ON cities (state_name, state_code);
CREATE INDEX country_idx ON cities (country_name, country_code);

-- id
-- name
-- state_id
-- state_code
-- state_name
-- country_id
-- country_code
-- country_name
-- latitude
-- longitude
-- wikiDataId
