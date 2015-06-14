app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state, CartFactory) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

        

        $scope.error = null;

        AuthService.login(loginInfo).then(function () {
            $state.go('home');
            // when the user is verified, create a new Cart object in the db
            // but first, check if that cartID already exists.  if it does, updated the cart
            AuthService.getLoggedInUser().then(function(user){
                console.log('user exists', user)
                if(user) {
                    // CartFactory.getOpenCarts(user._id).then(function (carts){
                    //     console.log('These are the open carts if they exist: ',carts);
                    // })
                    CartFactory.getCarts(user._id).then(function(cart){
                        console.log('this is the user\'s cart', cart)
                        // if they have a cart, add to it from localStorage to database
                        if(cart !== undefined){
                            CartFactory.updateOrder(cart._id, CartFactory.getFromLocalStorage())
                        } else {
                            var newCart = CartFactory.getFromLocalStorage();
                            newCart['user'] = user._id;
                            CartFactory.createCart(newCart).then(function (result) {
                                console.log(result);
                            })
                        }
                    })
                } else {
                    if (localStorage.userCart !== undefined){
                        console.log('inside inside insde')
                        CartFactory.createCart(CartFactory.getFromLocalStorage());
                        localStorage.clear();
                    }
                }
            })
            
            
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});