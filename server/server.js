const MongoClient = require('mongodb').MongoClient;
let db;
const ObjectID = require('mongodb').ObjectID;

const express = require('express');
const app  = express();
const bodyParser = require('body-parser');

const cors = require('cors');
const nodemailer = require("nodemailer");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

//API get products for Home page
app.get('/api/new-products',function(req, res){
  db.collection("products").find({},{
    projection: {
      categories:0,
      characteristics: 0,
      disadvantage: 0,
      img2: 0,
      img3: 0,
      img4: 0,
      img5: 0,
      img6: 0,
      img7: 0,
      img8: 0
    }
  }).sort({_id:-1}).limit(6).toArray( (error,docs) => {
    if(error) {
      console.log(error);
      return res.sendStatus(500);
    }
    res.send(docs);
  });
});

//API get product by ID
app.get('/api/products/:id',cors(),function(req, res){
  db.collection("products").findOne({ _id: req.params.id}, (error,docs) => {
    if(error) {
      console.log(error);
      return res.sendStatus(500);
    }
    res.send(docs);
  });
});

//API get products for basket
app.post('/api/products-basket',cors(),function(req, res){
  let itm = req.body.map(el => ObjectID(el));
  db.collection("products").find({"_id" : { $in: itm}},{
    projection: {
      categories:0,
      characteristics: 0,
      disadvantage: 0,
      img2: 0,
      img3: 0,
      img4: 0,
      img5: 0,
      img6: 0,
      img7: 0,
      img8: 0
    }
  }).toArray( (error,docs) => {
    if(error) {
      console.log(error);
      return res.sendStatus(500);
    }
    res.send(docs);
  });
});

//API get products counter
app.get('/api/products-counter',function(req, res){
  db.collection("products").find({},{projection: { categories: 1, _id: 0}}).toArray( (error,docs) => {
    if(error) {
      console.log(error);
      return res.sendStatus(500);
    }
    const counter = docs.map(el => el.categories).reduce((acc, el) => {
      acc[el] = (acc[el] || 0) + 1;
      return acc;
    }, {});
    Object.assign(counter,{'all': docs.length});
    res.send(counter);
  });
});

//API GET PRODUCTS FILTERS
//NEED FIRST ADD SOLD AFTER
app.post('/api/filter-products',function(req, res){
  let category = req.body.category;
  let size = req.body.size;

  db.collection("products").find({},{
    projection: {
      characteristics: 0,
      disadvantage: 0,
      img2: 0,
      img3: 0,
      img4: 0,
      img5: 0,
      img6: 0,
      img7: 0,
      img8: 0
    }
  }).toArray( (error,docs) => {
    if(error) {
      console.log(error);
    }

    if(category === 'all'){
      if(size === 'all'){
        subObjProducts(docs,res);
      } else {
        let filterSizeProducts = docs.filter(el => el.size === size);
        subObjProductsWithSize(filterSizeProducts,docs,res);
      }
    } else {
      let filter = docs.filter(el => el.categories === category);
      if(size === 'all'){
        subObjProducts(filter,res);
      } else {
        let filterSizeProducts = filter.filter(el => el.size === size);
        subObjProductsWithSize(filterSizeProducts,filter,res);
      }
    }
  });
});

function subObjProductsWithSize(products,size,res) {
  let sizeArray = size.map(el => el.size);
  let counterSize = sizeArray.reduce((acc, el) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});

  res.send({
    products:products,
    size: counterSize
  });
}

function subObjProducts(products,res) {
  let sizeArray = products.map(el => el.size);
  let counterSize = sizeArray.reduce((acc, el) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});

  res.send({
    products:products,
    size: counterSize
  });
}


//-----------------------------------------//
app.post('/api/callback-mail',cors(),function (req,res) {

  const dataEmail = req.body;

  async function main() {
    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'lorena.friesen@ethereal.email',
        pass: 's2N9cgzSguAfRkQ3bx'
      }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "Moto Shield", // sender address
      to: "motoshield2018@gmail.com", // list of receivers
      subject: "Moto Shield", // Subject line
      text: dataEmail.phone // plain text body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    res.status(200).send(JSON.stringify('Заявка отправлена'));
  }
  main().catch(console.error);
});

MongoClient.connect('mongodb://localhost:27017/api', {
  useUnifiedTopology: true,
  useNewUrlParser: true
},(error,database) => {
  if(error){
    return console.log(error)
  }
  db = database.db('Motoshield');
  app.listen(9000,function(){
    console.log('Api app started');
  });
});
