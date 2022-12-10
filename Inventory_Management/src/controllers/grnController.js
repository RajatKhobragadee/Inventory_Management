const grnModel = require("../models/grnModle")
const grmLineItemModle = require("../models/grnLineItemModle")
const itemModle = require("../models/itemModle")



exports.grnCreate = async (req, res) => {
    try {

        let data = req.body
        let { status, invoiceNumber, vendorName, vendorFullAddress, grnLineItems, date } = data

        for (let i = 0; i < grnLineItems.length; i++) {

            const findgrmLineItem = await grmLineItemModle.findOne({ productName: grnLineItems[i] })
            if (!findgrmLineItem) return res.send({ status: true, message: "This item not present is grnItem" })
        }


        const createGrn = await grnModel.create(data)

        return res.status(201).send({ status: true, message: "GENERATED", createGrn })

    }
    catch (error) {

        return res.status(500).send({ status: false, message: error.message })
    }

}




exports.getGrn = async function (req, res) {
    try {
        const filterData = { deleted: false }

        const { status, invoiceNumber, vendorName, vendorFullAddress, grnLineItems } = req.query

        if (status) {
            filterData.status = status
        }
        if (invoiceNumber) {
            filterData.invoiceNumber = invoiceNumber
        }
        if (vendorName) {
            filterData.vendorName = vendorName
        }
        if (vendorFullAddress) {
            filterData.vendorFullAddress = vendorFullAddress
        }
        if (grnLineItems) {
            filterData.grnLineItems = grnLineItems
        }

        const grnDetail = await grnModel.find(filterData)
        return res.status(200).send({ status: true, data: grnDetail })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}


exports.updateGrn = async (req, res) => {

    try {
        let data = req.body
        const grnId = req.params.grnId;
        let { status, invoiceNumber, vendorName, vendorFullAddress, grnLineItems } = data
        let findGrn = await grnModel.findOne({ _id: grnId })
        if (!findGrn) return res.status(404).send({ status: false, message: "Grn not found" })

        let updateData = await grnModel.findOneAndUpdate({ data: data }, { status: status, invoiceNumber: invoiceNumber, vendorName: vendorName, vendorFullAddress: vendorFullAddress, grnLineItems: grnLineItems }, { new: true })
        return res.status(200).send({ status: true, mes: "udpated grn", data: updateData })
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

//=========Deleted====//

exports.deleteGrn = async (req, res) => {

    try {
        const id = req.params.id;
        let findGrn = await grnModel.findOne({ _id: id })
        if (!findGrn) return res.status(404).send({ status: false, message: "Grn not found" })
        if (findGrn.deleted == true) return res.status(404).send({ status: false, message: "Grn is already deleted" });
        if (findGrn.deleted == false) { await grnModel.findOneAndUpdate({ _id: id }, { deleted: true }) }
        return res.status(200).send({ status: false, message: "Grn deleted succesfully" })
    }

    catch (error) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}





//======================grn_update_status======//

exports.updateStatus = async (req, res) => {

    try {


        let data = req.body
        let { status } = data

        const grnId = req.params.grnid;
        let itemIID = req.params.itemid;

        let findGrn = await grnModel.findOne({ _id: grnId })

        let item = await itemModle.findOne({ _id: itemIID })

        if (status == "COMPLETED") {
            for (let i = 0; i < findGrn.grnLineItems.length; i++) {

                if ((findGrn.grnLineItems[i]) === (item.productName)) item.quantity -= 1


                let itemUpdate = await itemModle.findOneAndUpdate({ _id: item._id }, item, { new: true })

            }
        }


        let updateStatus = await grnModel.findOneAndUpdate({ _id: grnId }, { $set: { status: status } }, { new: true })
        return res.status(200).send({ status: true, message: "status succesfully updated", updateStatus })


    }
    catch (error) {
        return res.status(500).send({ status: false, msg: err.message })
    }

}
