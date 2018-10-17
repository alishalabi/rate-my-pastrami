const mongoose = require("mongoose")

// User model
const User = mongoose.model("User", {
  name: String,
  bio: String
})

module.exports = User;
