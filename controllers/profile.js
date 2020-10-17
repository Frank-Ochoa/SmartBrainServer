const handleProfile = (db) => (req, res) =>
{
	const {id} = req.params;

	db.select('*').from('users').where({id:id})
		.then(userProfile => userProfile.length ? res.json(userProfile[0]) : res.status(400).json('User Not Found'))
		.catch(err => res.status(400).json('Error Getting User'))

}

export default handleProfile;