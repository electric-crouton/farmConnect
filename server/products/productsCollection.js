const connection = require('../db/connection.js');

module.exports = {
  getProducts: (req, res) => {  // note that this is a dummy query for testing purposes
    connection.query('SELECT * FROM farm', (err, result) => {
      if (err) {
        console.error('error!', err);
      } else {
        res.send(result);
      }
    });
  },
  addProduct: (req, res) => {
    res.send('post');
  }
};
