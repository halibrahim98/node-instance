const mongoose = require('mongoose')

const productSchema =new mongoose.Schema({
    name: String
})

module.exports = mongoose.model('Product', productSchema)

exports.getAllProducts = function(){
    db.products.find()
}

exports.getOneProduct = function(){
    db.products.find({"id": 1})
}