var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  admin: Boolean,
  created_at: Date,
  updated_at: Date
});

// Create a schema
var User = mongoose.model('User', userSchema);

// Export
module.exports = User;
