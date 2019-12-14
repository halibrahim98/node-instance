const Product = require('../models/product')

exports.getAll = async function(req, res) {
    let products = await Product.findbyId()
    res.json({data: products})
}
exports.getOne = async function(req, res) {
    let products = await Product.findbyId(req.params.productId)
    res.json({data: products})
}
exports.create = async function(req, res) {
    let product = new Product(req.body)
  let newProduct = await product.save()
}

