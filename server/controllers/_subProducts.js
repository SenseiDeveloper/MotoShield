exports.subObjProducts = (error,products,cb) => {
  let sizeArray = products.map(el => el.size);
  let counterSize = sizeArray.reduce((acc, el) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});

  cb(error,{
    products:products,
    size: counterSize
  });
};

exports.subObjProductsWithSize = (error,products,size,cb) => {
  let sizeArray = size.map(el => el.size);
  let counterSize = sizeArray.reduce((acc, el) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});

  cb(error,{
    products:products,
    size: counterSize
  });
};
