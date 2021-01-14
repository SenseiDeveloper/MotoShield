const db = require('./db');
const ProductsController = require('./controllers/products');
const MailController = require('./controllers/mail');

const express = require('express');
const app  = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

//API get products for Home page
app.get('/api/new-products', ProductsController.newProducts);

//API get product by ID
app.get('/api/products/:id', ProductsController.findProduct);

//API get products for basket
app.post('/api/products-basket', ProductsController.basketProducts);

//API get products counter
app.get('/api/products-counter', ProductsController.productsCounter);

//API get products filter
app.post('/api/filter-products', ProductsController.productsFilter);

//API send callback
app.post('/api/callback-mail', cors(), MailController.sendCallback);

//API get invoice
app.post('/api/invoice', cors(), MailController.invoice);

db.connect('mongodb://localhost:27017/Motoshield', (error) => {
  if(error){
    return console.log(error)
  }
  app.listen(9000,function(){
    console.log('Api server started');
  });
});

