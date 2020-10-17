
const handleSignIn = (db, bcrypt) => (req, res) =>
{
	const {password, email} = req.body;
	if(!email || !password)
	{
		return res.status(400).json('Incorrect Form Submission');
	}

	db.select('email', 'hash').from('login').where({email: email})
		.then(data =>
			bcrypt.compareSync(password, data[0].hash)
				?
				db.select('*').from('users').where({email:email})
					.then(user => res.json(user[0]))
					.catch(err => res.status(400).json('Unable To Get User'))
				:
				res.status(400).json('Wrong Credentials')
		)
}

export default handleSignIn;