
const handleRegister = (db, bcrypt) => (req, res) =>
{
	const {name, email, password} = req.body;
	if(!name || !email || !password)
	{
		return res.status(400).json('Incorrect Form Submission');
	}

	const hash = bcrypt.hashSync(password);

	db.transaction(trx =>
	{
		trx.insert({
			hash: hash,
			email: email,
		})
			.into('login')
			.returning('email')
			.then(loginEmail =>
			{
				return trx('users')
					.returning('*')
					.insert(
						{
							email: loginEmail[0],
							name: name,
							joined: new Date()
						}
					)
					.then(response =>
					{
						res.json(response[0])
					})
					.catch(err => res.status(400).json('Unable To Register User First'))

			})
			.then(trx.commit)
			.catch(trx.rollback)
	})
		.catch(err => {
			res.status(400).json('Unable To Register User Second')
		})

}

export default handleRegister;