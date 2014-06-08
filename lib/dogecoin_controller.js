var dogecoin = require('node-dogecoin')();
dogecoin.set('user', 'dogegate');
dogecoin.set('password', config.get('dogecoind_password'));
dogecoin.auth('dogegate', config.get('dogecoind_password'));

module.exports = {

  getInfo: function(req, res) {
    console.log('get info');
    dogecoin.exec('getinfo', function(err, info) {
      if (err) {
        res.send(500, { error: err }); return;
      } else {
        res.send({ dogecoind: info });
      }
    }); 
  },

  getNewAddress: function(req, res) {
    dogecoin.getNewAddress(function(err, address) {
      if (err) {
        res.send(500, { error: err }); return;
      } else {
        res.send({ address: address });
      }
    }); 
  },

  listTransactions: function(req, res) {
    var from = req.query.from || 0;
    var count = req.query.count || 1;
    count = parseInt(count);
    from = parseInt(from);
    dogecoin.listTransactions("", count, from, function(err, transactions) {
      if (err) {
        res.send(500, { error: err }); return;
      } else {
        res.send({ transactions: transactions });
      }
    }); 
  },

  getTransaction: function(req, res) {
    var transactionHash = req.params.hash
    dogecoin.gettransaction(transactionHash, function(err, address) {
      if (err) {
        res.send(500, { error: err }); return;
      } else {
        res.send({ address: address });
      }
    }); 
  },

  listReceivedByAddress: function(req, res) {
    dogecoin.exec('listreceivedbyaddress', function(err, received) {
      if (err) {
        res.send(500, { error: err }); return;
      } else {
        res.send({ received: received });
      }
    }); 
  },

  getReceivedByAccount: function(req, res) {
    dogecoin.getreceivedbyaccount('', 2, function(err, received) {
      if (err) {
        res.send(500, { error: err }); return;
      } else {
        res.send({ received: received });
      }
    }); 
  },

  getReceivedByAddress: function(req, res) {
    dogecoin.getreceivedbyaddress(req.params.address, function(err, received) {
      if (err) {
        res.send(500, { error: err }); return;
      } else {
        res.send({ received: received });
      }
    }); 
  },

  sendToAddress: function(req, res) {
    console.log('body', req.body);
    console.log('params', req.params);
    console.log('query', req.query);
    req.checkParams('address', 'Invalid receive dogecoin address').notEmpty();
    req.checkParams('amount', 'Invalid amount to send').notEmpty().isNumeric();
    if (errors = req.validationErrors()){
      res.send(400, errors);
      return;
    }
    dogecoin.sendtoaddress(req.params.address, req.params.amount, function(err, transaction) {
      if (err) {
        res.send(500, { error: err }); return;
      } else {
        res.send({ transaction: transaction });
      }
    }); 
  },

  getAddresses: function(req, res) {
    dogecoin.getaddressesbyaccount("", function(err, received) {
      if (err) {
        res.send(500, { error: err }); return;
      } else {
        res.send({ received: received });
      }
    }); 
  },

  controller.listReceivedByAccount = function(req, res) {
    dogecoin.listreceivedbyaccount(function(err, received) {
      if (err) {
        res.send(500, { error: err }); return;
      } else {
        res.send({ received: received });
      }
    }); 
  }

};
