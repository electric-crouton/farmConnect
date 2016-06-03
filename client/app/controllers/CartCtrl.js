angular.module('farmConnect.cart', [])

.controller('CartCtrl', function($scope, $rootScope) {
  console.log('$rootScope.cart: ', $rootScope.cart);
  $rootScope.cart = $rootScope.cart || [];
  $scope.shippingCost = 5.99;

  $scope.getTotalItems = () => {
    return $rootScope.cart.length;
  };

  $scope.calculateItemTotal = (item) => {
    const itemTotal = parseFloat(item.quantity, 10) * parseFloat(item.pricePerPound, 10);
    return itemTotal.toFixed(2);
  };

  $scope.calculateTotal = () => {
    return ($scope.shippingCost + parseFloat($rootScope.cartSummary.subtotal, 10)).toFixed(2);
  };

});