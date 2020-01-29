const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/User");

module.exports = async function(token, callback) {
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    const id = decoded.user.id;

    let user = await User.findOne({ _id: id });

    return callback(user.name);
  } catch (err) {
    return callback("user");
  }
};
