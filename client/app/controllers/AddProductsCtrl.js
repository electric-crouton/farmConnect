angular.module('farmConnect.addProducts', [])

.controller('AddProductsCtrl', function($scope, Products) {

  $scope.product = {};
  
  $scope.addProduct = () => {
    Products.addProduct($scope.product);
  };

});