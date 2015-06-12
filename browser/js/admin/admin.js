app.config(function ($stateProvider) {

    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: 'js/admin/admin.html',
        controller: 'AdminCtrl',
        resolve: {
        	user: function (AuthService) {
        		return AuthService.getLoggedInUser()
        	}
        }
    });

});

app.controller('AdminCtrl', function ($scope, user, $state, CartFactory) {

    $state.user = user

});