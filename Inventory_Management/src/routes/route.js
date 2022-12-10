const express=require('express')
const { grnCreate,getGrn,updateGrn,deleteGrn,updateStatus} = require('../controllers/grnController')
const{createItem}=require("../controllers/itemController")
const {grnLineItem}=require("../controllers/grnLineItem")
const {OrderLineItem}=require("../controllers/orderLineItem")
const {createOrder,getOrder,updateOrder,deleteOrder,updateOrderStatus}=require("../controllers/orderController")
const {getItems} =require("../controllers/itemController")
const router=express.Router()


//=========================Grn Route==================//
router.post("/grn",grnCreate)
router.get("/grn",getGrn)
router.put("/grn/:grnId",updateGrn)
router.delete("/grn/:id",deleteGrn)

//=================Grn_line_item Route===================//
router.post("/grnLineItem",grnLineItem)

//=============/grn_update_status Route========================//
router.post("/grn/update-status/:grnid/:itemid",updateStatus)


//=================item Route============//
router.post("/item",createItem)

//===============Order_Line_Item Route=======//
router.post("/orderLineItem",OrderLineItem)

//========order create=====//
router.post("/order",createOrder)
router.get("/order",getOrder)
router.put("/order/:orderid",updateOrder)
router.delete("/order/:orderid",deleteOrder)

//===========/order/update-status Route=====//
router.post("/order/update-status/:orderid/:itemid",updateOrderStatus)


//================get_item Route=====//
router.get("/item/:itemid",getItems)
module.exports=router