const MongoClient = require('mongodb').MongoClient;

const state = {
  db: null
};

exports.connect = (url, done) =>{
  if(state.db) {
    return done();
  }
  MongoClient.connect(url,{ useUnifiedTopology: true },(err, db) => {
    if(err) {
      return done(err);
    }
    state.db = db.db('Motoshield');
    done();
  })
};

exports.get = () => {
  return state.db;
};
