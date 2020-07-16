const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('Please provide the password as an argument: node mongo.js <password>')
	process.exit(1)	
}

const password = process.argv[2]

const url =
	`mongodb+srv://dredly_Helsinki:${password}@cluster0.tqcff.mongodb.net/note-app?retryWrites=true&w=majority`
	
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const noteSchema = new mongoose.Schema({
	content: String,
	date: Date,
	important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

/*
const note = new Note({
	content: 'HTML is Easy',
	date: new Date(),
	important: true,
})

const note2 = new Note({
	content: 'css is Easy',
	date: new Date(),
	important: false,
})

const note3 = new Note({
	content: 'javascript is Hard',
	date: new Date(),
	important: true,
})

note.save().then(result => {
	console.log('note saved!')
	mongoose.connection.close()
})

note2.save().then(result => {
	console.log('note2 saved!')
	mongoose.connection.close()
})

note3.save().then(result => {
	console.log('note3 saved!')
	mongoose.connection.close()
})
*/

Note.find({ important: true }).then(result => {
	result.forEach(note => {
		console.log(note)
	})
	mongoose.connection.close()
})
