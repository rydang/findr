const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const database = require('./database');

const app = express();

app.use('/build', express.static('build'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', database);

app.post('/signup', (req, res) => {
  res.send(req.body);
});

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.listen(3000);
