const mongoose = require("mongoose")
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema

// Setting pagination options
mongoosePaginate.paginate.options = {
  limit: 2 // how many records on each page
};

// User model
const UserSchema = new Schema({
  name: String,
  bio: String
})

UserSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('User', UserSchema);
