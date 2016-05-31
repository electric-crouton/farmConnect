angular.module('farmConnect.products', [])

.controller('ProductsCtrl', function($scope, Products) {

  $scope.items = [];

  $scope.search = '';

  Products.getProducts()
    .then((products) => {
      products.forEach((product) => {
        $scope.items.push(product);
      });
    });
});
