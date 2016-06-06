angular.module('farmConnect.checkout', [])

.controller('CheckoutCtrl', function($scope, $uibModalInstance, $rootScope) {
  $scope.checkoutForm = {};

  $scope.cancel = () => {
    $uibModalInstance.dismiss('cancel');
  };

  // checkout/payment would be handled thru angular-payments/stripe.js but since this is a demo, we don't want
  // to include actual credit card info, meaning that nothing will happen if we enter in fake credit card info
  // and click submit bc the form is invalidated and thus prevents us from submitting the form
  $scope.handleCheckout = () => {
    console.log('checkoutForm: ', $scope.checkoutForm);
    $rootScope.cart = [];
    $scope.cancel();
  };
});