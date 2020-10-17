import Clarifai from 'clarifai'
const app = new Clarifai.App({
	apiKey: '4771c32298c94ebca67a964b973b3296'
})

export const handleAPICall = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => res.json(data))
		.catch(err => res.status(400).json('Unable To Access API'))
}

export const handleImageEntries = (db) => (req, res) =>
{
	const {id} = req.body;
	db('users').where('id', '=', id).increment('entries', 1)
		.returning('entries')
		.then(entries => entries.length ? res.json(entries[0]) : res.status(400).json('Unable To Get Entries Count'))
		.catch(err => res.status(400).json('Unable To Get Entries Count'));

}

export default {handleAPICall, handleImageEntries};