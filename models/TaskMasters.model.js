var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var taskSchema = new Schema({
    name: String,
    created_at: Date,
    updated_at: Date
});

// Create a schema
var TaskMaster = mongoose.model('TaskMaster', taskSchema);

// Export
module.exports = TaskMaster;
