app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, $rootScope, AuthService, $state, CartFactory) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

        

        $scope.error = null;

        AuthService.login(loginInfo).then(function () {
            $state.go('home');
            // when the user is verified, create a new Cart object in the db
            // but first, check if that cartID already exists.  if it does, updated the cart
            AuthService.getLoggedInUser().then(function(user){
                if(user) {
                    // CartFactory.getOpenCarts(user._id).then(function (carts){
                    //     console.log('These are the open carts if they exist: ',carts);
                    // })
                    console.log('line 31 login.js ',$rootScope.previousPath);
                    //location.href = $rootScope.previousPath;
                    CartFactory.syncCart(user._id)
                } else {
                    if (localStorage.userCart !== undefined){
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