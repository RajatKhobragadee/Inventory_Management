const mongoose=require("mongoose")

const orderSchema=new mongoose.Schema({
  status:{type:String,enum:["GENERATED", "COMPLETED","CANCELLED"],default:"GENERATED"},
   invoiceNumber:Number,
   customerName:String,
   customerFullAddress:String,
   orderLineItems:{type:[String]},
   deleted:{type:Boolean,default:false},
   date:{type:Date,default:Date.now()}
  



},{timestamps: true})

module.exports=mongoose.model("order",orderSchema)