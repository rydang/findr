const pg = require('pg');
const express = require('express');

const router = express.Router();
const pool = pg.Pool({
  user: 'postgres',
  database: 'findr',
  port: 5432,
});

// const uri = 'postgres://postgres@localhost/findr';

let db;
pool.connect()
  // create tables if nonexistent
  .then((_db) => {
    db = _db;
    const friendsCreation = db.query(
      `CREATE TABLE IF NOT EXISTS "friends" (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(45),
        last_name VARCHAR(45)
      )`,
    );
    const interestsCreation = db.query(
      `CREATE TABLE IF NOT EXISTS "interests" (
        id SERIAL PRIMARY KEY,
        friend_id smallint NOT NULL,
        interest VARCHAR(45)
      )`,
    );
    Promise.all([friendsCreation, interestsCreation]);
  })
  .then(() => {
    // if friends table is empty, then add default users
    db.query('SELECT * FROM friends')
      .then(({ rows }) => {
        if (!rows.length) {
          const users = [
            'Brian', 'Wang',
            'Bryan', 'Yang',
            'Lion', 'Tame',
            'Lyon', 'Tayme',
            'Rian', 'Lang',
          ];

          let insertQuery = 'INSERT INTO friends(first_name, last_name) VALUES';
          for (let i = 0; i < users.length; i += 2) {
            insertQuery += `($${i + 1}, $${i + 2})`;
            if (i < users.length - 2) {
              insertQuery += ',';
            }
          }

          return db.query(
            insertQuery,
            users,
          );
        }
        return null;
      })
      .catch(err => console.log(err.stack));
    // if interests table is empty, then add default interests
    db.query('SELECT * FROM interests')
      .then(({ rows }) => {
        if (!rows.length) {
          const interests = [
            1, 'basketball',
            1, 'tea',
            1, 'sushi',
            2, 'politics',
            2, 'italian cuisine',
            3, 'meat',
            3, 'africa',
            3, 'hunting',
            4, 'acting',
            5, 'spelling',
            5, 'dancing',
          ];
          let insertQuery = 'INSERT INTO interests (friend_id, interest) VALUES';
          for (let i = 0; i < interests.length; i += 2) {
            insertQuery += `($${i + 1}, $${i + 2})`;
            if (i < interests.length - 2) {
              insertQuery += ',';
            }
          }
          return db.query(insertQuery, interests);
        }
        return null;
      })
      .catch(err => console.log(err.stack));
  })
  .catch(err => console.log(err.stack));


pool.end();

router.get('/', (req, res) => {
  db.query('SELECT * FROM friends, interests WHERE friends.id=interests.friend_id')
    .then(friends => res.status(200).send(friends.rows))
    .catch(err => res.status(400).send(err));
});

module.exports = router;
