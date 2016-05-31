angular.module ('farmConnect.services', [])

.factory('Products', ($http) => {
  var Products = {};

  Products.addProduct = (product) => (
    $http.post('/api/products', product)
    .then((resp) => {
      console.log('Product successfully added!');
    }, (err) => {
      console.error('Error in adding product!', err);
    })
  );
  
  Products.getProducts = () => (
    $http.get('/api/products')
    .then((products) => {
      console.log('Successfully retrieved products!');
      return products.data;
    }, (err) => {
      console.error('Error in getting products!', err);
    })
  );

  return Products;

})

.factory('Auth', function($http, $location) {
  var Auth = {};

  Auth.signin = function(user) {
    return $http.post('/api/users/signin', user)
    .then(function(resp) {
      return resp.data;
    });
  };

  Auth.signup = function(user) {
    return $http.post('/api/users/signup', user)
    .then(function(resp) {
      return resp.data;
    });
  };

  return Auth;
});
