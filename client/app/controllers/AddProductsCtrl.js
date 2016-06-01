angular.module('farmConnect.addProducts', [])

.controller('AddProductsCtrl', function($scope, Products) {

  $scope.product = {};
  $scope.alert = {};
  
  $scope.addProduct = () => {
    Products.addProduct($scope.product);
    // lines below are commented out bc they're not fully functional yet, need to load some ui-bootstrap stuff
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