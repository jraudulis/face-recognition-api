import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import knex from 'knex';
const saltRounds = 10;
const myPlaintextPassword = 's0/\\/\\P4$$w0rD';  // Ensure proper escaping of the backslashes
const someOtherPlaintextPassword = 'not_bacon';


import handleRegister from "./controllers/register.js";
import handleSignin from "./controllers/signin.js";
import handleProfileReq from "./controllers/signin.js";
import handleApiCalls from "./controllers/image.js";

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
    port: 5432
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});


