-- Table for storing park details
CREATE TABLE parks (
  id SERIAL PRIMARY KEY,
  park_id VARCHAR(50) UNIQUE NOT NULL, -- unique identifier from the Parks API
  name TEXT NOT NULL,
  city TEXT,
  state CHAR(2) NOT NULL, -- assuming U.S. state codes (e.g., 'UT')
  latitude NUMERIC(9,6) NOT NULL,
  longitude NUMERIC(9,6) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for storing weather forecasts for parks
CREATE TABLE weather (
  id SERIAL PRIMARY KEY,
  park_id VARCHAR(50) NOT NULL,
  forecast JSONB NOT NULL, -- stores weather forecast data as JSON
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_park
    FOREIGN KEY(park_id)
      REFERENCES parks(park_id)
      ON DELETE CASCADE
);

-- Table for storing user accounts
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL
);


