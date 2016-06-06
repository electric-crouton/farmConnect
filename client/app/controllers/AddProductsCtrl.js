angular.module('farmConnect.addProducts', [])

.controller('AddProductsCtrl', function($scope, Products, $window, $rootScope) {

  $scope.product = {};
  $scope.alert = {};

  $scope.addProduct = () => {
    const currentUser = $window.localStorage.getItem('currentUser');
    const parsedUser = JSON.parse(currentUser);
    $scope.product.farmName = parsedUser.farmName;
    $scope.product.farmLocation = parsedUser.farmLocation;
    $scope.product.farmPhone = parsedUser.farmPhone;

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
    // currentUser is a stringified object so we have to parse it
    const parsedUser = JSON.parse(currentUser);
    console.log('parsedUser: ', parsedUser);

    // checks to see if user is logged in and if user is a farmer
    if (currentUser !== null && parsedUser.farmer === 'true' || parsedUser.farm_name) {
      return true;
    } else { 
      return false;
    }
  };

});