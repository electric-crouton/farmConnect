angular.module('farmConnect.addProducts', [])

.controller('AddProductsCtrl', function($scope, Products, $window) {

  $scope.product = {};
  $scope.alert = {};

  $scope.addProduct = () => {
    Products.addProduct($scope.product)
    .then(() => {
      $scope.product = {};
      $scope.alert = {
        type: 'success', 
        msg: 'Your product was successfully added!'
      };
    })
    .catch(() => {
      $scope.alert = {
        type: 'danger', 
        msg: 'There was an error in adding your product! Please try again.'
      };
    });
  };

  $scope.closeAlert = () => {
    $scope.alert = {};
  };

  // checks if the current user is a farmer in order to allow user to post a new product to sell
  $scope.isFarmer = () => {
    const currentUser = $window.localStorage.getItem('currentUser');
    const parsedUser = JSON.parse(currentUser);
    console.log('parsedUser: ', parsedUser);

    if (parsedUser && parsedUser.isFarmer == 'true' || parsedUser.farmer == true) {
      return true;
    }
    return false;
  };

});