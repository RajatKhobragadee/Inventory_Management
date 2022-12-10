const itemModle = require("../models/itemModle");

exports.createItem = async (req, res) => {
    try {
        let data = req.body;

        const { productName, quantity, stockPrice, sellPrice } = data;
        const uniqueProductName = await itemModle.findOne({productName: productName});
        if (uniqueProductName)
            return res.status(400).send({ status: false, message: "Product name should be unique" });

        const findItem = await itemModle.create(data);
        return res.status(201).send({ status: true, message: "GENERATED", data: findItem });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

};



//===============get item===============//
exports.getItems = async (req, res) => {
try {
    let id = req.params.itemid;
    const findItem = await itemModle.findOne({ _id: id });

    if (!findItem)
        return res.status(404).send({ status: false, message: "item not found" });
    if (findItem.deleted == true)
        res.status(404).send({ status: false, message: "item already deleted" });
    return res.status(200).send({ status: false, data: findItem });
    
} catch (error) {
    return res.status(500).send({ status: false, message: error.message })
}
   
};
