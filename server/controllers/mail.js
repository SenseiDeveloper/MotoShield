const Mail = require('../models/mail');

//Controller for send callback
exports.sendCallback = (req,res) => {
  Mail.sendCallback(req.body,(error,docs) => {
    if(error) return res.sendStatus(500);
    res.status(200).send(JSON.stringify(docs));
  });
};

//Controller for invoice
exports.invoice = (req,res) => {
  Mail.invoice(req.body, (error,docs) => {
    if(error) return res.sendStatus(500);
    res.status(200).send(JSON.stringify(docs));
  });
};
