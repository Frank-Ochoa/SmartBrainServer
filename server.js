import express from 'express';
import cors from 'cors';
import knex from 'knex'
import bcrypt from "bcrypt-nodejs";
import handleRegister from "./controllers/register.js";
import handleSignIn from "./controllers/signin.js";
import handleProfile from "./controllers/profile.js";
import {handleAPICall, handleImageEntries} from "./controllers/image.js";

const PORT = process.env.PORT;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex({
	client: 'pg',
	connection: {
		connectionString : process.env.DATABASE_URL,
		ssl : true
	}
});

const app = express()
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => res.json("It's working!"))

// Post to not transfer data
app.post('/signin', handleSignIn(db, bcrypt))

// Normal way of doing
//app.post('/register', (req, res) => handleRegister(req, res, db, bcrypt))
app.post('/register', handleRegister(db, bcrypt))

app.get('/profile/:id', handleProfile(db))

app.put('/image', handleImageEntries(db))

app.post('/imageurl', (req, res) =>  handleAPICall(req, res))

app.listen(PORT, () =>
{
	console.log(`app is running on ${PORT}`)
})

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> updated user or count of some sort

 */

// Create db transaction when you have to do multiple db operations at once