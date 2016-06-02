angular.module('farmConnect.products', [])

.controller('ProductsCtrl', function($scope, Products, $rootScope) {

  $scope.items = [];
  $scope.search = '';
  $scope.alert = {};
  $rootScope.cart = [];
  $rootScope.cartSummary = {
    numOfItems: 0,
    itemsText: 'items',
    total: 0
  };

  Products.getProducts()
    .then((products) => {
      console.log('products in controller: ', products);
      products.forEach((product) => {
        $scope.items.push(product);
      });
    });

  $scope.addToCart = (item) => {
    if ($rootScope.cart.indexOf(item) === -1) {
      $rootScope.cart.push(item);
      $rootScope.cartSummary.numOfItems++;
      $rootScope.cartSummary.itemsText = $rootScope.cartSummary.numOfItems === 1 ? 'item' : 'items';
      $rootScope.cartSummary.total += (item.quantity * item.pricePerPound);
      item.quantity = 0;
      $scope.alert = {
        type: 'success',
        msg: 'Item successfully added to cart!'
      };
    } else {
      console.log('Item already in cart!');
      $scope.alert = {
        type: 'danger',
        msg: 'Item already in cart!'
      };
    }
  };

  $scope.closeAlert = () => {
    $scope.alert = {};
  };
});
