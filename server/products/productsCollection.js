const connection = require('../db/connection.js');

exports.getProducts = (req, res) => {  // note that this is a dummy query for testing purposes
  connection.query('SELECT * FROM farm, produce, post WHERE produce.id = post.produce_id AND farm.id = post.farm_id', (err, result) => {
    if (err) {
      console.error('error!', err);
    } else {
      var data = result.rows;
      var posts = data.map((datum) => {
        return [
            {
             farmName: "Old McDonald's Farm",
             farmLocation: "Marin",
             farmPhone: "2223334444",
             productName: "apples",
             pricePerPound: 10,
             poundsAvailable: 5
           },
            {
             farmName: "Old McDonald's Farm",
             farmLocation: "Marin",
             farmPhone: "2223334444",
             productName: "carrots",
             pricePerPound: 3,
             poundsAvailable: 20
           },
           {
             farmName: "Uncle Bob's Farm",
             farmLocation: "Marin",
             farmPhone: "5556667777",
             productName: "carrots",
             pricePerPound: 4.99,
             poundsAvailable: 40
           },
           {
             farmName: "Uncle Bob's Farm",
             farmLocation: "Marin",
             farmPhone: "5556667777",
             productName: "lettuce",
             pricePerPound: 3.99,
             poundsAvailable: 30
           },
        ];


          // farmName: datum.farm_name,
          // farmLocation: datum.location,
          // farmPhone: datum.phone,
          // productName: datum.product_name,
          // pricePerPound: datum.price_per_pound,
          // poundsAvailable: datum.pounds_available
      });
      res.send(posts);
    }
  });
};
  
exports.addFarmIfNecessary = (req, res, next) => {
  var product = req.body;
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
  var product = req.body;
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
  var product = req.body;
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
