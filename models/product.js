const mongoose = require('mongoose')

const productSchema =new mongoose.Schema({
    name: String
})

module.exports = mongoose.model('Product', productSchema)

exports.getAllProducts = function(){
    return
    [
        {
            id:1,
            name:"Laptop"
        },
        {
            id:2,
            name:"Screen"
        }
    ]
}

exports.getOneProduct = function(){
    return
    [
        {
            id:1,
            name:"Laptop"
        }
    ]
}