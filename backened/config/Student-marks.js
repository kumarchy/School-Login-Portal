const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema({
  class:String,
  roll_number:String,
  subject: String,
  full_marks: Number,
  pass_marks: Number,
  obtained_marks: Number,
  remarks: String
});

module.exports = mongoose.model('student marks', marksSchema);
