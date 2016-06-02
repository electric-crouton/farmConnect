const productsCollection = require('../products/productsCollection.js');

module.exports = (app) => {
  app.get('/api/products', productsCollection.getPosts);
  app.post('/api/products', productsCollection.handlePost);
};
