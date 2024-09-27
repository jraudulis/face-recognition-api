const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'bober',
    database: 'face-recognition'
  }
});

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) =>{
 res.send('succes');
});

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt) });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.handleProfileReq(req, res, db) });
app.put('/image', (req, res) =>{ image.handleImageReq(req, res, db) });
app.post('/imageUrl', (req, res) =>{ image.handleApiCall(req, res) });

app.listen(3001, () =>{
 console.log('server is running');
});



