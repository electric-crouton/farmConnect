angular.module('farmConnect.cart', [])

.controller('CartCtrl', function($scope, $rootScope) {
  $rootScope.cart = $rootScope.cart || [];
  $scope.shippingCost = 5.99;

  $scope.getTotalItems = () => {
    return $rootScope.cart.length;
  };

  $scope.calculateItemTotal = (item) => {
    const itemTotal = parseFloat(item.quantity) * parseFloat(item.pricePerPound);
    return itemTotal.toFixed(2);
  };

  const calculateSubtotal = () => {
    var cartSubtotal = 0;
    $rootScope.cart.forEach((item) => {
      cartSubtotal = parseFloat(cartSubtotal) + parseFloat($scope.calculateItemTotal(item));
    });
    return cartSubtotal.toFixed(2);
  };

  $scope.calculateTotal = () => {
    return ($scope.shippingCost + parseFloat($rootScope.cartSummary.subtotal)).toFixed(2);
  };

  $scope.removeItemFromCart = (itemIndex) => {
    $rootScope.cart.splice(itemIndex, 1);
    $rootScope.cartSummary.subtotal = calculateSubtotal();
    $scope.calculateTotal();
    $rootScope.cartSummary.numOfItems = $rootScope.cart.length;
  };

});