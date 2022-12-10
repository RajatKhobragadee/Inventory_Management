const mongoose=require("mongoose")

const grnLineItemSchema=new mongoose.Schema({
    productName:{type:String,required:true},
    quantity:{type:Number,required:true},
    stockPrice:{type:Number,required:true},
   deleted:{type:Boolean,default:false}
},{timestamps: true})

module.exports=mongoose.model("grnLineItem",grnLineItemSchema)