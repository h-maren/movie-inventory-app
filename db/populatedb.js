#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS movie_details (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
movie_title VARCHAR ( 255 ),
movie_director VARCHAR ( 255 ),
movie_year INTEGER
);

INSERT INTO movie_details (movie_title,movie_director,movie_year) 
VALUES
  ('There Will Be Blood','Paul Thomas Anderson',2007),
  ('Fargo','Joel and Ethan Coen',1996),
  ('Silence of the Lambs','Jonathan Demme',1991),
  ('Grey Gardens','Albert and David Maysles',1975)
;

CREATE TABLE IF NOT EXISTS movie_categories (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
category_type VARCHAR (255)
);

INSERT INTO movie_categories (category_type)
VALUES
  ('Horror'),
  ('Drama'),
  ('Action'),
  ('Comedy'),
  ('Documentary')
;

CREATE TABLE IF NOT EXISTS movie_with_category (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
movieid INTEGER,
categoryid INTEGER
);

INSERT INTO movie_with_category (movieid,categoryid)
VALUES
 (1,2),
 (2,2),
 (2,4),
 (3,1),
 (4,5),
 (4,4)
;`

async function main() {
    console.log("seeding...");
    const client = new Client({
      host: "localhost", // or wherever the db is hosted
      user: process.env.ROLE,
      database: "movie_database",
      password: process.env.PASSWORD,
      port: 5432 // The default port
    });
    console.log('client connecting...');
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
  }

main();