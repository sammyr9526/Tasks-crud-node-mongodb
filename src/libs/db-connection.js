require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
let db;

module.exports = function Connection() {
  if (!db) {
    db = mongoose.createConnection(MONGODB_URI);
  }
  return db;
};
