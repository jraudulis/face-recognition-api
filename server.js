import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import knex from 'knex';

// Importing controller functions
import handleRegister from "./controllers/register.js";
import handleSignin from "./controllers/signin.js";
import handleProfileReq from "./controllers/profile.js";  // Assuming this file exists
import handleApiCalls from "./controllers/image.js";  // Corrected import

// Set up database connection using Knex
const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },  // SSL connection, may need tweaking
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
    port: 5432
  }
});

const app = express();
app.use(cors());
app.use(bodyParser.json());  // Middleware to parse JSON body

// Routes
app.get('/', (req, res) => {
  res.send('success');
});

app.post('/signin', (req, res) => { handleSignin(req, res, db, bcrypt) });  // Fixed the function reference
app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { handleProfileReq(req, res, db) });  // Corrected function reference
app.put('/image', (req, res) => { handleImageReq(req, res, db) });  // Use handleImageReq directly
app.post('/imageUrl', (req, res) => { handleApiCalls(req, res) });  // Use handleApiCall directly

// Set up the server port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
