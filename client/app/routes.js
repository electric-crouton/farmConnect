angular.module('farmConnect.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('home', {
      url: "/",
      templateUrl: 'views/AddProductForm.html',
      controller: 'AddProductsCtrl'
  })


$urlRouterProvider.otherwise('/')

});