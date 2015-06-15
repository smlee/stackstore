app.config(function ($stateProvider) {

    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/checkout/checkout.html',
        controller: 'CheckoutCtrl',
        resolve: {
        	user: function (AuthService) {
        		return AuthService.getLoggedInUser()
        	},
        	carts: function (AuthService, CartFactory) {
        		return AuthService.getLoggedInUser()
        		.then(function (user) {
        			if (user) return CartFactory.getCarts(user._id)
                    return CartFactory.getFromLocalStorage();
        		})
        	}
        }
    });
});

app.controller('CheckoutCtrl', function ($scope, ContactFactory, united, $state, user, carts){
	$scope.sendAddressInfo = function(info){
		ContactFactory.sendNewContactInfo(user._id, info).then(function(response){
			console.log('contact info succesfully added')
			$state.go('payment');
		});
	}

	$scope.contactType = ['shipping', 'billing', 'home', 'event'];
	$scope.states = united.states;
});