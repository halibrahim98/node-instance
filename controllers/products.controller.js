const Product = require('../models/product')

exports.getAll = async function(req, res) {
    let products = await Product.findbyId(req.params.productId)
    res.json({data: products})
}
