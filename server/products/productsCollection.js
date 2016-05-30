const connection = require('../db/connection.js');

exports.getProducts = (req, res) => {  // note that this is a dummy query for testing purposes
  connection.query('SELECT * FROM farm, produce, post WHERE produce.id = post.produce_id AND farm.id = post.farm_id', (err, result) => {
    if (err) {
      console.error('error!', err);
    } else {
      var data = result.rows;
      var posts = data.map((datum) => {
        return {
          farmName: datum.farm_name,
          farmLocation: datum.location,
          farmPhone: datum.phone,
          productName: datum.product_name,
          pricePerPound: datum.price_per_pound,
          poundsAvailable: datum.pounds_available
        };
      });
      res.send(posts);
    }
  });
};
  
exports.addFarmIfNecessary = (req, res, next) => {
  product = req.body;
  connection.query(`SELECT EXISTS (SELECT * FROM farm WHERE name = '${product.farmName}')`, (err, result) => {
    if (!result.rows[0].exists) {
      connection.query(
        `INSERT INTO farm (name, location, phone)\
        VALUES ('${product.farmName}', '${product.farmLocation}', '${product.farmPhone}')`, 

        (err, result) => {
          if (err) {
            console.error('error:', err);
          } else {
            next();
          }
        }
      );
    } else {
      next();
    }
  });
};

exports.addProduceIfNecessary = (req, res, next) => {
  product = req.body;
  connection.query(`SELECT EXISTS (SELECT * FROM produce WHERE name = '${product.productName}')`, (err, result) => {
    if (!result.rows[0].exists) {
      connection.query(
        `INSERT INTO produce (name)\
        VALUES ('${product.productName}')`, 

        (err, result) => {
          if (err) {
            console.error('error:', err);
          } else {
            next();
          }
        }
      );
    } else {
      next();
    }
  });
};

exports.addProduct = (req, res) => {
  product = req.body;
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
};
