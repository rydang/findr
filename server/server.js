const express = require('express');
const path = require('path');
const database = require('./database');

const app = express();

app.use('/api', database);

if (process.env.NODE_ENV === 'production') {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'));
  });
}

app.listen(3000);
