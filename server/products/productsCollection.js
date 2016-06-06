const connection = require('../db/connection.js');
const utils = require('../config/utils.js');

//return an array of all posts in the database
exports.getPosts = (req, res) => { 
  connection.query('SELECT * FROM farms, products, posts WHERE products.id = posts.product_id AND farms.id = posts.farm_id', (err, result) => {
    if (err) {
      console.error('error!', err);
    } else {
      var rows = result.rows;
      console.log('posts:', rows);
      var posts = rows.map((datum) => {
        return {
          farmName: datum.farm_name,
          farmLocation: datum.location,
          farmPhone: datum.phone,
          productName: datum.product_name,
          pricePerPound: datum.price_per_pound,
          poundsAvailable: datum.pounds_available
        };
      });
      console.log('posts:', posts);
      res.send(posts);
    }
  });
};

//add the product to the products table if it wasn't already there
var addProductIfNecessary = (req, res, callback) => {
  const post = req.body;
  console.log('post', post, post.farmName);

  connection.query({
      text: 'SELECT EXISTS (SELECT * FROM products WHERE product_name = $1)',
      values: [post.productName] 
    }, 

    (err, result) => {
    //if the product is not in the table, add it
    if (!result.rows[0].exists) {

      connection.query({
          text: 'INSERT INTO products (product_name) VALUES ($1)',
          values: [post.productName]
        },    

        (err, result) => {
          if (err) {
            console.error('error:', err);
          } else {
            console.log('product added!');
            //then move on to addPost
            callback(req, res, post);
          }
        }
      );
    //if the product is already in the table, just move on to addPost
    } else {
      console.log('product already in table!');
      callback(req, res, post);
    }
  });
};

//add the post to the posts table
var addPost = (req, res, post) => {
  //add the post, specifying the farm and and the product with foreign keys
  connection.query(
    {
      text: 'INSERT INTO posts\
      (farm_id, product_id, price_per_pound, pounds_available)\
      VALUES ((SELECT id FROM farms WHERE farm_name = $1),\
      (SELECT id FROM products WHERE product_name = $2),\
      $3,\
      $4)',

      values: [post.farmName, post.productName, post.pricePerPound, post.poundsAvailable]
    },

    (err, result) => {
      //send a response to the client (or, if the post request came from the dummy data file rather than the client, then do nothing)
      if (err) {
        console.error('error:', err);
        if (res) {
          res.sendStatus(500); 
        }
      } else {
        if (res) {
          res.sendStatus(201); 
        }
      }
    }
  );
};

//add the product to the products table if necessary, then add the post to the posts table
exports.handlePost = (req, res) => {
  addProductIfNecessary(req, res, addPost);
};
