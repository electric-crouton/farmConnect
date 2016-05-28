angular.module('farmConnect.products', [])

.controller('ProductsCtrl', function($scope, Products) {

  $scope.items = [
    'Apples',
    'Bananas',
    'Cucumbers',
    'So many'
  ];

  $scope.search = '';

  Products.getProducts()
    .then(function(products) {
      $scope.items.push(products);
    });
});
