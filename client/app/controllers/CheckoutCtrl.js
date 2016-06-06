angular.module('farmConnect.checkout', [])

.controller('CheckoutCtrl', function($scope, $uibModalInstance) {
  $scope.checkoutForm = {};

  $scope.cancel = () => {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.handleCheckout = (status, response) => {
    console.log('response from handleCheckout: ', response);
    console.log('checkoutForm: ', $scope.checkoutForm);
  };
});