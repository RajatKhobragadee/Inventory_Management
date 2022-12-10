const mongoose=require("mongoose")

const grnSchema=new mongoose.Schema({
    status:{type:String,enum:["GENERATED","COMPLETED", "CANCELLED"],default:"GENERATED"},
    invoiceNumber:{type:Number},
    vendorName:{type:String},
    vendorFullAddress:String,
    grnLineItems:{type:[String],required:true},
    date: {type:String ,default:null},
    deleted:{type:Boolean,default:false}
},{timestamps: true})

module.exports=mongoose.model("grn",grnSchema)