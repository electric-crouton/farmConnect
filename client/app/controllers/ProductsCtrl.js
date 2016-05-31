angular.module('farmConnect.products', [])

.controller('ProductsCtrl', function($scope, Products) {

  $scope.items = [];

  $scope.search = '';

  Products.getProducts()
    .then(function(products) {
      products.forEach(function(product) {
        $scope.items.push(product);
      });
    });
});
