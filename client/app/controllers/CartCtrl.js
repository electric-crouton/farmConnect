angular.module('farmConnect.cart', [])

.controller('CartCtrl', function($scope, $rootScope, ngCart) {
  console.log('$rootScope.cart: ', $rootScope.cart);
  $rootScope.cart = $rootScope.cart || [];

  ngCart.setTaxRate(9.0);
  ngCart.setShipping(2.99); 

  $scope.getTotalItems = () => {
    return $rootScope.cart.length;
  };

});