'use strict';
app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, CartFactory) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.items = [
                { label: 'Home', state: 'home' },
                { label: 'About', state: 'about' },
                { label: 'View Products', state: 'shopping'},
                // { label: 'Tutorial', state: 'tutorial' },
                { label: 'Admin', state: 'admin'},
                { label: 'New Customer', state: 'customerForm' },
                { label: 'Purchase', state: 'product' },
                { label: 'Cart', state: 'cart' },
                { label: 'Artist Page', state: 'artist' },
                { label: 'Artist Manage', state: 'profileForm' }
                // { label: 'Members Only', state: 'membersOnly', auth: true }
            ];

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {
                // need to work on this
                AuthService.getLoggedInUser().then(function(user){
                    console.log('on logout user', user)
                    CartFactory.getCarts(user._id).then(function(carts){
                        console.log('on logout carts', carts)
                        localStorage.setItem('userCart', JSON.stringify(carts))
                    });
                });
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});