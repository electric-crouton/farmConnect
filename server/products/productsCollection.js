const connection = require('../db/connection.js');

var getProducts = module.exports.getProducts = (req, res) => {  // note that this is a dummy query for testing purposes
  connection.query('SELECT * FROM farm', (err, result) => {
    if (err) {
      console.error('error!', err);
    } else {
      res.send(result);
    }
  });
};
  
var addFarm = module.exports.addFarm = (req, res) => {
  product = req.body;
  connection.query(
    `INSERT INTO farm (name, location, phone)\
    VALUES ('${product.farmName}', '${product.farmLocation}', '${product.farmPhone}')`, 

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

var addProduce = module.exports.addProduce = (req, res) => {
  product = req.body;
  connection.query(
    `INSERT INTO produce (name)\
    VALUES ('${product.productName}')`, 

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
// var addProduct = module.expo (req, res) => {
//     product = req.body;
//     // console.log(req.body);
//     connection.query(`SELECT EXISTS (SELECT * FROM farm WHERE name = '${product.farmName}')`, (err, result) => {
//       console.log('exists:', result.rows[0].exists);
//       if (!result.rows[0].exists) {
//         connection.query(
//           `INSERT INTO farm (name, location, phone)\
//           VALUES ('${product.farmName}', '${product.farmLocation}', '${product.farmPhone}')`,          
        
//         (err, result) => {
//           if (err) {
//             console.error('error:', err);
//             res.sendStatus(500);
//           } else {
//             res.sendStatus(200);
//           }
//       res.send(result);
//     });
//     connection.query(
//       `INSERT INTO post\
//       (farm_id, produce_id, pricePerPound, poundsAvailable)\  //note that this was the var name that was wrong in the database
//       VALUES ((SELECT id FROM farm WHERE name = '${product.farmName}'),\
//       (SELECT id FROM produce WHERE name = '${product.productName}'),\
//       ${product.pricePerPound},\
//       ${product.poundsAvailable})`,

//       (err, result) => {
//         if (err) {
//           console.error('error:', err);
//           res.sendStatus(500);
//         } else {
//           res.sendStatus(200);
//         }
//       }

//     );
//   }
// };
