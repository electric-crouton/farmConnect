angular.module('farmConnect.auth', [])

.controller('AuthCtrl', function($scope, Auth, $window, $location) {
  $scope.user = {};

  $scope.isUserSignedin = () => {
    if ($window.localStorage.getItem('currentUser')) {
      return true;
    } else { return false; }
  };

  $scope.signin = () => {
    Auth.signin($scope.user)
      .then(function (data) {
        $window.localStorage.setItem('currentUser', JSON.stringify(data.user));
        $location.path('/products');
      })
      .catch(function (error) {
        console.error('Error in signing in:', error);
      });
  };

  $scope.signup = () => {
    Auth.signup($scope.user)
      .then(function (data) {
        $window.localStorage.setItem('currentUser', JSON.stringify(data.user));
        $location.path('/products');
      })
      .catch(function (error) {
        console.error('Error in signing up', error);
      });
  };

  $scope.signout = () => {
    Auth.signout();
  };

});