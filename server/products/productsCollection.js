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
      res.send(posts);
    }
  });
};

//add the farm to the farms table if it wasn't already there
//will be obsoleted once auth stuff is merged in 
var addFarmIfNecessary = (req, res, callback1, callback2) => {
  const body = req.body;
  console.log('post body:', body);
  const post = {
    farmName: utils.escape(body.farmName),
    farmLocation: utils.escape(body.farmLocation),
    farmPhone: utils.escape(body.farmPhone),
    productName: utils.escape(body.productName),
    pricePerPound: body.pricePerPound,
    poundsAvailable: body.poundsAvailable
  };
  console.log('post', post, post.farmName);

  connection.query({
      text: 'SELECT EXISTS (SELECT * FROM farms WHERE farm_name = $1)',
      values: [post.farmName]
    }, 

    (err, result) => {
    //if the farm is not in the table, add it
    if (!result.rows[0].exists) {
      connection.query({
          text: 'INSERT INTO farms (farm_name, location, phone) VALUES ($1, $2, $3)',
          values: [post.farmName, post.farmLocation, post.farmPhone]
        }, 

        (err, result) => {
          if (err) {
            console.error('error:', err);
          } else {
            console.log('farm added!');
            //then move on to addProductIfNecessary
            callback1(req, res, post, callback2);
          }
        }
      );
    //if the farm is already in the table, just move on to addProductIfNecessary
    } else {
      console.log('farm already in table!');
      callback1(req, res, post, callback2);
    }
  });
};

//add the product to the products table if it wasn't already there
var addProductIfNecessary = (req, res, post, callback) => {
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
    //if the farm is already in the table, just move on to addPost
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
          res.sendStatus(200); 
        }
      }
    }
  );
};

//add the farm and the product to their respective tables is necessary, then adds the post to the posts table
exports.handlePost = (req, res) => {
  addFarmIfNecessary(req, res, addProductIfNecessary, addPost);
};
