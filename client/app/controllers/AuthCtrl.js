angular.module('farmConnect.auth', [])

.controller('AuthCtrl', function($scope, Auth, $window, $location, $rootScope) {
  $scope.user = {};

  $scope.isUserSignedin = () => {
    if ($window.localStorage.getItem('currentUser')) {
      return true;
    } else { return false; }
  };

  $scope.signin = () => {
    Auth.signin($scope.user)
      .then(function (data) {
        // console.log('data in signin of AuthCtrl: ', data);
        $window.localStorage.setItem('currentUser', data.user);
        $rootScope.currentUser = data.user;
        $location.path('/products');
      })
      .catch(function (error) {
        console.error('Error in signing in:', error);
      });
  };

  $scope.signup = () => {
    Auth.signup($scope.user)
      .then(function (data) {
        // console.log('data in signup of authctrl: ', data);
        $window.localStorage.setItem('currentUser', data.user);
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