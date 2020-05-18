var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var ticketSchema = new Schema({
    name: String,
    description: String,
    created_at: Date,
    updated_at: Date
});

// Create a schema
var Ticket = mongoose.model('Ticket', ticketSchema);

// Export
module.exports = Ticket;
