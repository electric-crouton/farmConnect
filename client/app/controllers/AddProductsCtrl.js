angular.module('farmConnect.addProducts', [])

.controller('AddProductsCtrl', function($scope, Products) {

  $scope.product = {};
  
  $scope.addProduct = function () {
    Products.addProduct($scope.product);
  };

});