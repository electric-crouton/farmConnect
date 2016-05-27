const productsController = require('../products/productsController.js');

module.exports = (app) => {
  app.get('/api/products', productsController.getProducts);
  app.post('/api/products', productsController.addProduct);
};
