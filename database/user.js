let mongoose = require("mongoose");
let Schema = mongoose.Schema; // Schema is a class in mongoose
let userSchema = new Schema({
  uniqueIdentifier: String, // hashed password
  username: String,
  email: String,
  previousRequestedServer: String,
});
let User = mongoose.model("User", userSchema);
module.exports = User;
