const productsCollection = require('../products/productsCollection.js');
const authController = require('../auth/authController.js');

module.exports = (app) => {
  app.get('/api/products', productsCollection.getPosts);
  app.post('/api/products', productsCollection.handlePost);
  app.post('/api/users/signin', authController.signIn);
  app.post('/api/users/signup', authController.signUp);
};
