angular.module('farmConnect.cart', [])

.controller('CartCtrl', function($scope, $rootScope, Cart) {
  $rootScope.cart = $rootScope.cart || [];
  $scope.shippingCost = 5.99;

  $scope.getTotalItems = () => {
    return $rootScope.cart.length;
  };

  $scope.calculateItemTotal = (item) => {
    return Cart.calculateItemTotal(item);
  };

  $scope.calculateTotal = () => {
    return ($scope.shippingCost + parseFloat($rootScope.cartSummary.subtotal)).toFixed(2);
  };

  $scope.removeItemFromCart = (itemIndex) => {
    $rootScope.cart.splice(itemIndex, 1);
    $rootScope.cartSummary.subtotal = Cart.calculateSubtotal();
    $scope.calculateTotal();
    $rootScope.cartSummary.numOfItems--;
    $rootScope.cartSummary.itemsText = $rootScope.cartSummary.numOfItems === 1 ? 'item' : 'items';
  };

});