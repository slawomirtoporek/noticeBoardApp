const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectToDB = require('./db');

const app = express();

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});

connectToDB();

if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: ["http://localhost:3000", "http://localhost:8000"], credentials: true }));
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({ 
  secret: `${process.env.SESSION_PASS}`, 
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create(mongoose.connection)
}));

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/client/build')));

app.use('/auth', require('./routes/auth.routes'));
app.use('/api', require('./routes/ads.routes'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json('Not found...');
});