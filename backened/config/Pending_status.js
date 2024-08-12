const mongoose=require("mongoose");

const pendingSchema=new mongoose.Schema({
  roll_number
  :String,
  student_name:String,
  parent_name:String,
  payment_status:String,
  phone_number:String
});

module.exports=mongoose.model('pending fee statuses',pendingSchema);