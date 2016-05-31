angular.module('farmConnect.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('addProduct', {
      url: '/sell',
      templateUrl: 'views/AddProductForm.html',
      controller: 'AddProductsCtrl',
      authenticate: true
    })
    .state('products', {
      url: '/products',
      templateUrl: 'views/ProductsPage.html',
      controller: 'ProductsCtrl'
    })
    .state('signin', {
      url: '/signin',
      templateUrl: 'views/signin.html',
      controller: 'AuthController'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'views/signup.html',
      controller: 'AuthController'
    });

  $urlRouterProvider.otherwise('/products');
  
});
