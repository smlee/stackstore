app.config(function ($stateProvider) {

    $stateProvider.state('register', {
        url: '/register',
        templateUrl: 'js/register/register.html',
        controller: 'RegisterCtrl'
    });

});

app.controller('RegisterCtrl', function ($scope, $rootScope, $state, AuthService, CartFactory, RegisterFactory) {

    $scope.register = {
        first_name: null,
        last_name: null,
        email: null,
        password: null,
        confirm: null
    };

    $scope.signUp = function(newInfo) {

        RegisterFactory.newUser(newInfo).then(function(result) {

            console.log('this is the result after register', result);
            $scope.loginInfo = {
                email: result.email,
                password: newInfo.password
            };

            console.log('login info',$scope.loginInfo);

            AuthService.login($scope.loginInfo).then(function () {
                AuthService.getLoggedInUser().then(function(user) {
                    if (user) {
                        location.href = $rootScope.previousPath;
                        CartFactory.syncCart(user._id)
                    }else{
                        if (localStorage.userCart !== undefined){
                            CartFactory.createCart(CartFactory.getFromLocalStorage());
                            localStorage.clear();
                        }
                    }
                })
            })

        })
    };

});