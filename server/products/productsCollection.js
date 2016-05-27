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
    product = req.body;
    console.log(req.body);
    connection.query(
      `INSERT INTO post\
      (farm_id, produce_id, pricePerPound, amountAvailable)\
      VALUES ((SELECT id FROM farm WHERE name = '${product.farmName}'),\
      (SELECT id FROM produce WHERE name = '${product.productName}'),\
      ${product.pricePerPound},\
      ${product.poundsAvailable})`,

      (err, result) => {
        if (err) {
          console.error('error:', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      }

    );
  }
};
