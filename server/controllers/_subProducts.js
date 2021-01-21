const counter = (products) => {
  let sizeArray = products.map(el => el.size);
  return sizeArray.reduce((acc, el) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});
};

exports.subObjProducts = (error,products,page,cb) => {
  if (products.length < 8 ){
    cb(error,{
      products: products,
      size: counter(products)
    });
  } else {
    const startIndex = (page - 1) * 8;
    const endIndex = page * 8;
    const productsSizeArray = products.slice(startIndex, endIndex);
    cb(error,{
      products: productsSizeArray,
      size: counter(products)
    });
  }
};

exports.subObjProductsWithSize = (error,products,size,page,cb) => {
  if (products.length < 8 ) {
    cb(error,{
      products: products,
      size: counter(size)
    });
  } else {
    const startIndex = (page - 1) * 8;
    const endIndex = page * 8;
    const productsSizeArray = products.slice(startIndex, endIndex);
    cb(error,{
      products: productsSizeArray,
      size: counter(products)
    });
  }
};

/*
exports.subCounter = (error,products,page,cb) => {
  let sizeArray = products.map(el => el.size);
  let counterSize = sizeArray.reduce((acc, el) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});

  if (products.length < 8 ){
    cb(error,{
      products: products,
      size: counterSize
    });
  } else {
    const startIndex = (page - 1) * 8;
    const endIndex = page * 8;
    const productsSizeArray = products.slice(startIndex, endIndex);

    cb(error,{
      products: productsSizeArray,
      size: counterSize
    });
  }
};

exports.subFilter = ( catOpt , sizeOpt) => {
  var query;
  if( catOpt === 'all' && sizeOpt === 'all') {
    query = {};
  } else if (catOpt === 'all' && sizeOpt !== 'all'){
    query = { size : sizeOpt }
  } else  if (catOpt !== 'all' && sizeOpt === 'all'){
    query = { categories : catOpt }
  } else {
    query = {$and: [{ categories: catOpt},{size: sizeOpt}]}
  }
  return query;
};
*/
