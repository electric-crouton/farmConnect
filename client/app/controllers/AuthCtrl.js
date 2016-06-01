angular.module('farmConnect.auth', [])

.controller('AuthCtrl', function($scope, Auth, $window, $location) {
  $scope.user = {};
  $scope.loggedIn = false;

  $scope.signin = () => {
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.farmConnect', token);
        $scope.loggedIn = true;
        $location.path('/products');
      })
      .catch(function (error) {
        console.error('Error in signing in:', error);
      });
  };

  $scope.signup = () => {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.farmConnect', token);
        $scope.loggedIn = true;
        $location.path('/products');
      })
      .catch(function (error) {
        console.error('Error in signing up', error);
      });
  };

  $scope.signout = () => {
    $scope.loggedIn = false;
    Auth.signout();
  };

});