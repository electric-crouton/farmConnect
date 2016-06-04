angular.module('farmConnect.products', [])

.controller('ProductsCtrl', function($scope, Products, $rootScope, Cart) {

  $scope.items = [];
  $scope.search = '';
  $scope.alert = {};
  $rootScope.cart = $rootScope.cart || [];
  $rootScope.cartSummary = $rootScope.cartSummary || {
    numOfItems: 0,
    itemsText: 'items',
    subtotal: 0
  };

  Products.getProducts()
    .then((products) => {
      console.log('products: ', products);
      products.forEach((product) => {
        $scope.items.push(product);
      });
    });

  $scope.addToCart = (item) => {
    if ($rootScope.cart.indexOf(item) === -1) {
      $rootScope.cart.push(item);
      $rootScope.cartSummary.numOfItems++;
      $rootScope.cartSummary.itemsText = $rootScope.cartSummary.numOfItems === 1 ? 'item' : 'items';
      
      $rootScope.cartSummary.subtotal = Cart.calculateSubtotal();

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
