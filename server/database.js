const pg = require('pg');
const express = require('express');

const router = express.Router();
const pool = pg.Pool({
  user: 'postgres',
  database: 'findr',
  port: 5432,
});

let db;
pool.connect()
  // create tables if nonexistent
  .then((_db) => {
    db = _db;
    const friendsCreation = db.query(
      `CREATE TABLE IF NOT EXISTS "friends" (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(45) NOT NULL,
        last_name VARCHAR(45) NOT NULL,
        phone_number VARCHAR(12) NOT NULL,
        username VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL
      )`,
    );
    const interestsCreation = db.query(
      `CREATE TABLE IF NOT EXISTS "interests" (
        id SERIAL PRIMARY KEY,
        friend_id smallint NOT NULL,
        interest VARCHAR(45) NOT NULL
      )`,
    );
    return Promise.all([friendsCreation, interestsCreation]);
  })
  // add default entries to tables
  .then(() => {
    // if friends table is empty, then add default users
    db.query('SELECT * FROM friends')
      .then(({ rows }) => {
        if (!rows.length) {
          const users = [
            'Brian', 'Wang', '111-111-1111', 'brianwang', 'hunter2',
            'Bryan', 'Yang', '222-222-2222', 'bryanyang', 'hunter2',
            'Lion', 'Tame', '333-333-3333', 'liontame', 'hunter2',
            'Lyon', 'Tayme', '444-444-4444', 'lyontayme', 'hunter2',
            'Rian', 'Lang', '555-555-5555', 'rianlang', 'hunter2',
            'Ryan', 'Dang', '666-666-6666', 'ryandang', 'hunter2',
            'Lian', 'Zhang', '777-777-7777', 'lianzhang', 'hunter2',
            'Pyan', 'Pang', '888-888-8888', 'pyanpang', 'hunter2',
            'Pian', 'Pain', '999-999-9999', 'pianpain', 'hunter2',
          ];

          let insertQuery = 'INSERT INTO friends(first_name, last_name, phone_number, username, password) VALUES';
          for (let i = 0; i < users.length; i += 5) {
            insertQuery += `($${i + 1}, $${i + 2}, $${i + 3}, $${i + 4}, $${i + 5})`;
            if (i < users.length - 5) {
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
            1, 'verbing',
            2, 'politics',
            2, 'italian cuisine',
            2, 'sushi',
            3, 'meat',
            3, 'basketball',
            3, 'africa',
            3, 'hunting',
            4, 'acting',
            5, 'spelling',
            5, 'dancing',
            5, 'acting',
            6, 'testing',
            6, 'smelling',
            6, 'dancing',
            6, 'verbing',
            6, 'nouning',
            6, 'adjectiveing',
            6, 'playing',
            6, 'singing',
            6, 'adulting',
            6, 'kidding',
            6, 'running',
            6, '-ing',
            6, 'screamin',
            6, 'databaseing',
            6, 'SQLing',
            6, 'scrolling',
            6, 'reacting',
            6, 'reduxing',
            6, 'routing',
            7, 'model airplanes',
            7, 'flying',
            7, 'sushi',
            7, 'testing',
            8, 'tapdance',
            8, 'music',
            8, 'tennis',
            8, 'playing',
            9, 'racing',
            9, 'tea',
            9, 'acting',
            9, 'competition',
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

router.get('/', (req, res) => db.query(
  `SELECT
  friends.first_name,
  friends.last_name,
  friends.phone_number,
  friends.username,
  interests.interest
  FROM friends, interests WHERE friends.id=interests.friend_id`,
)
  .then(everything => res.status(200).send(everything.rows))
  .catch(err => res.status(400).send(err)));

router.get('/friends/:username', (req, res) => {
  const { username } = req.params;
  db.query('SELECT interests.interest FROM friends, interests WHERE friends.username=$1 AND interests.friend_id=friends.id', [username])
    .then((result) => {
      const interests = [];
      const interestsString = [];
      result.rows.forEach(({ interest }, i) => {
        interests.push(interest);
        interestsString.push(`$${i + 1}`);
      });
      const selectQuery = (
        `SELECT * FROM friends WHERE id IN (SELECT friend_id FROM interests WHERE interest IN (${interestsString.toString()}))`
      );
      return db.query(selectQuery, interests);
    })
    .then(result => res.send(result.rows))
    .catch(err => res.status(400).send(err));
});

router.get('/friends', (req, res) => db.query('SELECT * FROM friends')
  .then(friends => res.status(200).send(friends.rows))
  .catch(err => res.status(400).send(err)));

router.get('/interests', (req, res) => db.query('SELECT * FROM interests')
  .then(interests => res.status(200).send(interests.rows))
  .catch(err => res.status(400).send(err)));

router.post('/friends', (req, res) => {
  const {
    first_name,
    last_name,
    phone_number,
    username,
    password,
    interest,
  } = req.body;
  const parameters = [first_name.trim(), last_name.trim(), phone_number, username, password];
  // parameters[2].replace(/\D/g, '');

  db.query(`SELECT username FROM "friends" WHERE username='${username}'`)
    .then((users) => {
      if (users.rows.length) return res.status(400).send('user already exists');
      db.query('INSERT INTO "friends" (first_name, last_name, phone_number, username, password) VALUES ($1,$2,$3,$4,$5) RETURNING id', parameters)
        .then((friends) => {
          const { id } = friends.rows[0];
          let insertQuery = 'INSERT INTO "interests" (friend_id, interest) VALUES';
          const interestParameters = [];
          let emptyInterests = 0;

          interest.forEach((entry, i) => {
            if (!entry.trim()) {
              emptyInterests += 1;
              return;
            }
            insertQuery += `(${id},$${i + 1 - emptyInterests})`;
            interestParameters.push(entry);
            if (i < interest.length - 2) insertQuery += ',';
          });

          return db.query(insertQuery, interestParameters)
            .then(() => {
              res.cookie('username', username).status(200).redirect('/friends');
            })
            .catch(err => res.status(400).send(err));
        })
        .catch(err => res.status(400).send(err));
    });
});

router.post('/interests', (req, res) => {
  const { interests } = req.body;

  let insertQuery = 'INSERT INTO "interests" (friend_id, interest) VALUES';
  const parameters = [];
  interests.forEach((entry, i) => {
    insertQuery += `($${2 * i + 1},$${2 * i + 2})`;
    parameters.push(entry.friend_id, entry.interest);
    if (2 * i + 1 < interests.length) insertQuery += ',';
  });

  db.query(insertQuery, parameters)
    .then(() => res.status(200).send('success'))
    .catch(err => res.status(400).send(err));
});

router.post('/verify', (req, res) => {
  const { username, password } = req.body;
  db.query(`SELECT password FROM friends WHERE username='${username}'`)
    .then((users) => {
      if (!users.rows.length) {
        return res.status(401).redirect('/error?error=nouser');
      }

      if (users.rows[0].password !== password) return res.status(401).redirect('/error?error=wrongpass');
      return res.cookie('username', username).status(200).redirect('/friends');
    })
    .catch(err => res.status(400).send(err));
});

module.exports = router;
