const express = require('express');
const path = require('path');
const database = require('./database');

const app = express();

app.use('/api', database);

if (process.env.NODE_ENV !== 'development') {
  console.log('in production');
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/index.html'));
  });

  app.get('/friends', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/friends.html'));
  });
}

app.listen(3000);
