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
            // when the user is verified
            if (localStorage.userCart !== undefined){
                CartFactory.createCart(CartFactory.getFromLocalStorage());
                localStorage.clear();
            }
            
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});