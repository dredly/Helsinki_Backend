const mongoose = require('mongoose')

const password = process.argv[2]

const url =
	`mongodb+srv://dredly_Helsinki:${password}@cluster0.tqcff.mongodb.net/phonebook?retryWrites=true&w=majority`
	
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const entrySchema = new mongoose.Schema({
	name: String,
	number: String,
})

const Entry = mongoose.model('Entry', entrySchema)

if (process.argv.length === 5) {
	const entry = new Entry({
		name: process.argv[3],
		number: process.argv[4],
	})

	entry.save().then(result => {
		console.log(`Added ${entry.name} number ${entry.number} to the phonebook!`)
		mongoose.connection.close()
	})
}

else if (process.argv.length === 3) {
	Entry.find({}).then(result => {
	console.log('phonebook:')
	result.forEach(entry => {
		console.log(`${entry.name} ${entry.number}`)
	})
	mongoose.connection.close()
})
}

else {
	console.log('Usage:', '\n', 'To view all entries: node mongo_phonebook.js <password>',
	'\n', 'To add a new entry: node mongo_phonebook.js <password> <name> <number>')
	process.exit(1)
}