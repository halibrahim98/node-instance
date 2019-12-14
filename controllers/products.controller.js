const Product = require('../models/product')

module.exports = {
    getAll: async function(req,res){
        try {
            let products = await Product.find()
            res.json({data: products})
        } catch (error) {
            res.json({error: error})
        }
    },

    getOne: async function(req,res) {
        let products = await Product.find(req.params.productId)
        res.json({data: products})
    },

    create: async function(req,res){
        let product = new Product(req.body)
          let newProduct = await product.save()
    }
}