const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(session({ 
  secret: `${process.env.SESSION_PASS}`, 
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb+srv://toporekslawomir:z698iPAwqggXI4mO@clusterO.rimjfuu.mongodb.net/NoticeBoardDB?retryWrites=true&w=majority&appName=Cluster0', dbName: 'NoticeBoardDB' })
}));

app.use('/auth', require('./routes/auth.routes'));
app.use('/api', require('./routes/ads.routes'));

app.use((req, res) => {
  res.status(404).json('Not found...');
});

mongoose.connect(
  'mongodb+srv://toporekslawomir:z698iPAwqggXI4mO@clusterO.rimjfuu.mongodb.net/NoticeBoardDB?retryWrites=true&w=majority&appName=Cluster0'
);

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});

db.on('error', err => console.log('Error ' + err));

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});