/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds, please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

const { default: Contact } = require('./src/Components/Contact');

// Select the database to use.

require('./src/Components/Contact')



use('mongodbVSCodePlaygroundDB');

// Insert a document into the Customers collection.
db.getCollection('Customers').insertOne({ 'id': 1, 'email': Contact.otherName() });

// Run a find command to view the inserted document in the Customers collection.
const customer = db.getCollection('Customers').findOne({ 'id': 1 });

// Print a message to the output window.
console.log(`Customer with id 1: ${JSON.stringify(customer)}`);
