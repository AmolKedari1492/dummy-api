var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var taskSchema = new Schema({
    name: String,
    status: String,
    created_at: Date,
    updated_at: Date
});

// Create a schema
var Task = mongoose.model('Task', taskSchema);

// Export
module.exports = Task;
