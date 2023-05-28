const express = require('express'); 
const mongoose = require('mongoose'); 
const Product = require('./models/productModels')

const app = express(); 


const PORT = 8080; 

//middlewares 
app.use(express.json()); 
app.use(express.urlencoded({extended: false})); 



//routes
app.get('/product/:id', async(req, res) => {
    try {
        const {id} = req.params
        const productId = await Product.findById(id); 
        res.status(200).json(productId);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})  
app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products); 
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}) 
app.post('/product', async(req, res) => {
    try { 
        const product = await Product.create(req.body)
        res.status(200).json(product); 
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message}); 
    }
})
app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog, my name is Kingsley Ebor')
})

//update a product 

app.put('/products/:id', async(req, res) => {
    try { 
        const {id} = req.params; 
        const product = await Product.findByIdAndUpdate(id, req.body)
        if (!product) {
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
            
        } 
        //if the Id passed from the params or to the server, matches, then update the product 
        const updatedProduct = await Product.findById(id); 
        res.status(200).json(updatedProduct); 
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

//delete a product 
app.delete('/product/:id', async(req, res) => {
    try {
        const {id} = req.params; 
        const product = await Product.findByIdAndDelete(id)
        if(!product) {
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        } 
        res.status(200).json({product});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})



//server live 



//mongodb connection 

mongoose.connect('mongodb://localhost:27017/Node-API')
.then(() => {
    console.log('connected to a Mongo Database')
    app.listen(PORT, ()=> {
        console.log(`server running at ${PORT}`)
    }); 
}).catch((error) => {
    console.log(error)
})

