angular.module('farmConnect.products', [])

.controller('ProductsCtrl', function($scope, Products, $rootScope) {

  $scope.items = [];
  $scope.search = '';
  $rootScope.cart = [];
  $rootScope.cartSummary = {
    numOfItems: 0,
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
    } else {
      console.log('Item already in cart!');
    }
  };
});
