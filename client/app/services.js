angular.module ('farmConnect.services', [])

.factory('Products', function($http) {
  var Products = {};

  Products.addProduct = function(product) {
    return $http.post('/api/products', product)
    .then(function(resp) {
      console.log('Product successfully added!');
    }, function(err) {
      console.error('Error in adding product!', err);
    });
  };

  return Products;
});