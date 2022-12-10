const orderModle = require("../models/orderModle")
const orderLineItemModle = require("../models/orderLIneItemModle")
const itemModle = require("../models/itemModle")


exports.createOrder = async (req, res) => {

    try {
        let data = req.body
        let { status, invoiceNumber, customerName, customerFullAddress, orderLineItems } = data

        for (let i = 0; i < orderLineItems.length; i++) {

            const findOrderLineItem = await orderLineItemModle.findOne({ productName: orderLineItems[i] })
            if (!findOrderLineItem) return res.send({ status: true, message: "This item not present is orderLine" })
        }

        const createOrder = await orderModle.create(data)
        return res.status(201).send({ status: true, message: "GENERATED", createOrder })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }


}






exports.getOrder = async function (req, res) {
    try {
        const filterData = { deleted: false }

        const orderDetail = await orderModle.find(filterData)
        if (!orderDetail) res.status(404).send({ status: false, message: "Order not found" })
        return res.status(200).send({ status: true, data: orderDetail })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}





exports.updateOrder = async (req, res) => {

    try {
        let data = req.body
        const orderId = req.params.orderid;
        let { status, invoiceNumber, customerName, customerFullAddress, orderLineItems, date } = data
        let findOrder = await orderModle.findOne({ _id: orderId })
        if (!findOrder) return res.status(404).send({ status: false, message: "Order not found" })

        let updateData = await orderModle.findOneAndUpdate({ data: data }, { status: status, invoiceNumber: invoiceNumber, customerName: customerName, customerFullAddress: customerFullAddress, $addToSet: { orderLineItems: orderLineItems }, date: date }, { new: true })
        return res.status(200).send({ status: true, mes: "Order Updated succesfully", data: updateData })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }


}



exports.deleteOrder = async (req, res) => {

    try {
        const id = req.params.orderid;
        let findOrder = await orderModle.findOne({ _id: id })
        if (!findOrder) return res.status(404).send({ status: false, message: "Order not found" })
        if (findOrder.deleted == true) return res.status(404).send({ status: false, message: "Order is already deleted" });
        if (findOrder.deleted == false) { await orderModle.findOneAndUpdate({ _id: id }, { deleted: true }) }
        return res.status(200).send({ status: false, message: "Order  succesfully deleted" })
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}



//======================Order_update_status======//

exports.updateOrderStatus = async (req, res) => {

    try {
        let data = req.body
        let { status } = data

        const orderId = req.params.orderid;
        let itemIID = req.params.itemid;

        let findOrder = await orderModle.findOne({ _id: orderId })

        let item = await itemModle.findOne({ _id: itemIID })

        if (status == "COMPLETED") {
            for (let i = 0; i < findOrder.orderLineItems.length; i++) {

                if ((findOrder.orderLineItems[i]) === (item.productName)) item.quantity -= 1


                let itemUpdate = await itemModle.findOneAndUpdate({ _id: item._id }, item, { new: true })

            }
        }


        let updateStatus = await orderModle.findOneAndUpdate({ _id: orderId }, { $set: { status: status } }, { new: true })
        return res.status(200).send({ status: true, message: "status succesfully updated", updateStatus })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }

}





