const Products = require('../models/products');

//Controller for products Home page
exports.newProducts = (req,res) => {
  Products.newProducts((error,docs) => {
    if(error) return res.sendStatus(500);
    res.send(docs);
  });
};

//Controller for find product by ID
exports.findProduct = (req,res) => {
  Products.findProduct( req.params.id,(error,docs) => {
    if(error) return res.sendStatus(500);
    res.send(docs);
  });
};

//Controller get products for basket
exports.basketProducts = (req,res) => {
  Products.basketProducts(req.body, (error,docs) => {
    if(error) return res.sendStatus(500);
    res.send(docs);
  });
};

//Controller  products counter
exports.productsCounter = (req,res) => {
  Products.productsCounter( (error,docs) => {
    if(error) return res.sendStatus(500);
    res.send(docs);
  });
};

//Controller  filter Products
exports.productsFilter = (req,res) => {
  Products.productsFilter(req.body, (error,docs) => {
    if(error) return res.sendStatus(500);
    res.send(docs);
  });
};

//Controller search Input
exports.searchField = (req,res) => {
  Products.searchField(req.body, (error,docs) => {
    if(error) return res.sendStatus(500);
    res.send(docs);
  });
};
