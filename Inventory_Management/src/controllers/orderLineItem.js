const orderLineItemModle =require("../models/orderLIneItemModle")

exports.OrderLineItem=async(req,res)=>{

    try {
        let data=req.body
        let {productName,quantity,sellPrice}=data
        
        if(!productName) return res.status(400).send({ status: false, message: "please mention productName in body" })
        if(!quantity) return res.status(400).send({ status: false, message: "please mention quantity in body" })
        if(!sellPrice) return res.status(400).send({ status: false, message: "please mention stockPrice in body" })
        
        const createOrderLineItem=await orderLineItemModle.create(data)
        return res.status(201).send({status:true,message:"GENERATED",data:createOrderLineItem})
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }

}