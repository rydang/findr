const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const database = require('./database');

const app = express();

app.use(session({ secret: 'findr', resave: true, saveUninitialized: true, name: 'findrsid' }));
app.use('/build', express.static('build'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', database);

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.listen(3000);
