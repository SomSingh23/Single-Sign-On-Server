let mongoose = require("mongoose");
let Schema = new mongoose.Schema({
  email: String,
  password: String,
  jwt_secret: String,
});
let User = mongoose.model("User", Schema);
module.exports = User;
