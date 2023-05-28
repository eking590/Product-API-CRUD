const mongoose = require('mongoose');  //import mongoose module 


//create the product schema 
const productSchema = mongoose.Schema(   
    {
        name : {
            type: String, 
            required: [true, "please enter a product name"]
        }, 
        quantity: {
            type:Number, 
            required: true, 
            default: 0
        }, 
        price: {
            type: Number, 
            required:true,
        }, 
        image: {
            type: String, 
        } 
        
    }, 
    {
        timestamps: true 
    }
) 


const Product = mongoose.model('Product', productSchema); 

module.exports = Product; 