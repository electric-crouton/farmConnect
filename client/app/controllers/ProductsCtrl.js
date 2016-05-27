angular.module('farmConnect.products', [])

.controller('ProductsCtrl', function($scope) {

  $scope.items = [
    'Apples',
    'Bananas',
    'Cucumbers'
  ];
  
  $scope.search = '';

  $scope.done = function(todo) {
    var indexOf = $scope.todos.indexOf(todo);
    if (indexOf !== -1) {
      $scope.todos.splice(indexOf, 1);
    }
  };

  $scope.add = function(e) {
    if (e.which && e.which === 13) {
      $scope.todos.push($scope.newTodo);
      $scope.newTodo = '';
    }
  };

  $scope.taskAdd1 = function() {
    $scope.todos.push($scope.taskInput1);
    $scope.taskInput1 = "";
  };
});
