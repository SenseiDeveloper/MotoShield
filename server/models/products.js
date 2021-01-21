const db = require('../db');
const ObjectID = require('mongodb').ObjectID;
const subFunction = require('../controllers/_subProducts');

//Model for products Home page
exports.newProducts = (cb) => {
  db.get().collection("products").find({},{
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
    cb(error,docs);
  });
};

//Model for find product by ID
exports.findProduct = (id,cb) => {
  db.get().collection("products").findOne({ _id: ObjectID (id)}, (error,docs) => {
    cb(error,docs);
  });
};

//Model products for basket
exports.basketProducts = (id,cb) => {
  const itm = id.map(el => ObjectID(el));
  db.get().collection("products").find({_id : { $in: itm}},{
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
  }).toArray( (error,docs) => { cb(error,docs) });
};

//Model products counter
exports.productsCounter = (cb) => {
  db.get().collection("products").find({},{projection: { categories: 1, _id: 0}}).toArray( (error,docs) => {
    const counter = docs.map(el => el.categories).reduce((acc, el) => {
      acc[el] = (acc[el] || 0) + 1;
      return acc;
    }, {});
    Object.assign(counter,{'all': docs.length});
    cb(error,counter);
  });
};

//Model filter Products
exports.productsFilter = (prod,cb) => {
  const category = prod.category;
  const size = prod.sizeCategory;
  const page = prod.page;

 /* db.get().collection("products").find(subFunction.subFilter(category,size),{
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
    }}).toArray((error,docs) => subFunction.subCounter(error,docs,page,cb));*/
  db.get().collection("products").find({},{
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
    if(category === 'all'){
      if(size === 'all'){
        subFunction.subObjProducts(error,docs,page,cb);
      } else {
        let filterSizeProducts = docs.filter(el => el.size === size);
        subFunction.subObjProductsWithSize(error,filterSizeProducts,docs,page,cb);
      }
    } else {
      let filter = docs.filter(el => el.categories === category);
      if(size === 'all'){
        subFunction.subObjProducts(error,filter,page,cb);
      } else {
        let filterSizeProducts = filter.filter(el => el.size === size);
        subFunction.subObjProductsWithSize(error,filterSizeProducts,filter,page,cb);
      }
    }
  });
};
