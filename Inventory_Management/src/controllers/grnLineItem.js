const grmLineItemModle = require("../models/grnLineItemModle")
const { validString, isValid } = require("../validator/validator")


exports.grnLineItem = async (req, res) => {

    try {

        let data = req.body
        let { productName, quantity, stockPrice } = data

        if (!productName) return res.status(400).send({ status: false, message: "please mention productName in body" })
        if (!quantity) return res.status(400).send({ status: false, message: "please mention quantity in body" })
        if (!stockPrice) return res.status(400).send({ status: false, message: "please mention stockPrice in body" })

        //if(!isValid(productName)) return res.status(400).send({ status: false, message: "please enter valid product name" })

        const createGrnLineItem = await grmLineItemModle.create(data)
        return res.status(201).send({ status: true, message: "GENERATED", data: createGrnLineItem })

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }

}