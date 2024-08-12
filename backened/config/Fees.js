const mongoose=require("mongoose");

const feeSchema=new mongoose.Schema({
  year:String,
  month:String,
  total_monthly_fee:Number,
  pending_fee:Number
});

module.exports=mongoose.model("fee collections",feeSchema);