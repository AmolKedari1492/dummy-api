var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var mealSchema = new Schema({
    name: String,
    calories: Number,
    created_at: Date,
    updated_at: Date,
    user_id: Object
});

// Create a schema
var Meal = mongoose.model('Meal', mealSchema);

// Export
module.exports = Meal;
