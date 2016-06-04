angular.module('farmConnect.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('addProduct', {
      url: '/sell',
      templateUrl: 'views/addProductForm.html',
      controller: 'AddProductsCtrl',
      authenticate: true
    })
    .state('products', {
      url: '/products',
      templateUrl: 'views/productsPage.html',
      controller: 'ProductsCtrl'
    })
    .state('signin', {
      url: '/signin',
      templateUrl: 'views/signin.html',
      controller: 'AuthCtrl'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'views/signup.html',
      controller: 'AuthCtrl'
    })
    .state('cart', {
      url: '/cart',
      templateUrl: 'views/cart.html',
      controller: 'CartCtrl'
    });

  $urlRouterProvider.otherwise('/products');
  
})

.run(function($rootScope, $location, Auth) {
  
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
  });
});
