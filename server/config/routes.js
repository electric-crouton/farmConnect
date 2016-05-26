const productsController = require('../products/productsController.js');

module.exports = (app) => {
  app.get('/api/products', productsController.search);
  app.post('/api/products', productsController.post);
};
