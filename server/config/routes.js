const productsController = require('../products/productsCollection.js');

module.exports = (app) => {
  app.get('/api/products', productsController.getProducts);
  app.post('/api/products', productsController.addFarmIfNecessary);
  app.post('/api/products', productsController.addProduceIfNecessary);
  app.post('/api/products', productsController.addProduct);
};
