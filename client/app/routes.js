angular.module('farmConnect.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/AddProductForm.html',
      controller: 'AddProductsCtrl'
    })
    .state('products', {
      url: '/products',
      templateUrl: 'views/ProductsPage.html',
      controller: 'ProductsCtrl'
    });

  $urlRouterProvider.otherwise('/');
  
});
