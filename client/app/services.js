angular.module ('farmConnect.services', [])

.factory('Products', ($http) => {
  var Products = {};

  Products.addProduct = (product) => (
    $http.post('/api/products', product)
    .then((resp) => {
      console.log('Product successfully added!');
    }, (err) => {
      console.error('Error in adding product!', err);
    })
  );
  
  Products.getProducts = () => (
    $http.get('/api/products')
    .then((products) => {
      console.log('Successfully retrieved products!');
      return products.data;
    }, (err) => {
      console.error('Error in getting products!', err);
    })
  );

  return Products;

})

.factory('Auth', function($http, $location, $window) {
  var Auth = {};

  Auth.signin = (user) => {
    return $http.post('/api/users/signin', user)
    .then(function(resp) {
      return resp.data.token;
    });
  };

  Auth.signup = (user) => {
    return $http.post('/api/users/signup', user)
    .then(function(resp) {
      return resp.data.token;
    });
  };

  Auth.isAuth = () => {
    return !!$window.localStorage.getItem('com.farmConnect');
  };

  Auth.signout = () => {
    $window.localStorage.removeItem('com.farmConnect');
    $location.path('/signin');
  };

  return Auth;
});
