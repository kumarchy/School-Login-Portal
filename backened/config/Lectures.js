const mongoose=require("mongoose");

const lectureSchema=new mongoose.Schema({
  class:String,
  subject:String,
  url:String
});

module.exports=mongoose.model("lecture videos collections",lectureSchema);