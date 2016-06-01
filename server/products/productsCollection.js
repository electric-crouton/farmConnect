const connection = require('../db/connection.js');

exports.getPosts = (req, res) => { 
  connection.query('SELECT * FROM farms, products, posts WHERE products.id = posts.products_id AND farms.id = posts.farms_id', (err, result) => {
    if (err) {
      console.error('error!', err);
    } else {
      var rows = result.rows;
      var posts = data.map((datum) => {
        return {
          farmName: datum.farms_name,
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
  
var addFarmIfNecessary = (req, res, callback1, callback2) => {
  var post = req.body;
  connection.query(`SELECT EXISTS (SELECT * FROM farms WHERE farm_name = '${post.farmName}')`, (err, result) => {
    if (!result.rows[0].exists) {
      connection.query(
        `INSERT INTO farms (farm_name, location, phone)\
        VALUES ('${post.farmName}', '${post.farmLocation}', '${post.farmPhone}')`, 

        (err, result) => {
          if (err) {
            console.error('error:', err);
          } else {
            callback1(req, res, post, callback2);
          }
        }
      );
    } else {
      callback1(req, res, post, callback2);
    }
  });
};

var addProductIfNecessary = (req, res, post, callback) => {
  connection.query(`SELECT EXISTS (SELECT * FROM products WHERE product_name = '${post.productName}')`, (err, result) => {
    if (!result.rows[0].exists) {
      connection.query(
        `INSERT INTO products (product_name)\
        VALUES ('${post.productName}')`, 

        (err, result) => {
          if (err) {
            console.error('error:', err);
          } else {
            callback(req, res, post);
          }
        }
      );
    } else {
      callback(req, res, post);
    }
  });
};

var addPost = (req, res, post) => {
  console.log('add post', post);
  connection.query(
    `INSERT INTO posts\
    (farms_id, products_id, price_per_pound, pounds_available)\
    VALUES ((SELECT id FROM farms WHERE farm_name = '${post.farmName}'),\
    (SELECT id FROM products WHERE product_name = '${post.productName}'),\
    ${post.pricePerPound},\
    ${post.poundsAvailable})`,

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

exports.handlePost = (req, res) => {
  addFarmIfNecessary(req, res, addProductIfNecessary, addPost);
};
