DROP TABLE IF EXISTS users CASCADE;

--USERS
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(225) NOT NULL,
  password VARCHAR(225) NOT NULL,
  phone_number VARCHAR(20)
);