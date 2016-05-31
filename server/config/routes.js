const productsCollection = require('../products/productsCollection.js');

module.exports = (app) => {
  app.get('/api/products', productsCollection.getProducts);
  app.post('/api/products', productsCollection.addFarmIfNecessary);
  app.post('/api/products', productsCollection.addProduceIfNecessary);
  app.post('/api/products', productsCollection.addProduct);
};
