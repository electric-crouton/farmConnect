angular.module('farmConnect.addProducts', [])

.controller('AddProductsCtrl', function($scope, Products) {

  $scope.product = {};
  $scope.alert = {};
  
  $scope.addProduct = () => {
    Products.addProduct($scope.product);
    // .then(() => {
    //   $scope.product = {};
    //   $scope.alert = {
    //     type: 'success', 
    //     msg: 'Your product was successfully added!'
    //   };
    // })
    // .error(() => {
    //   $scope.alert = {
    //     type: 'danger', 
    //     msg: 'There was an error in adding your product! Please try again.'
    //   };
    // });
  };

  // $scope.closeAlert = function() {
  // };

});