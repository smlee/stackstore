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

app.controller('CheckoutCtrl', function ($scope, ContactFactory, united, $state, user, carts, $modal,$log){
	$scope.sendAddressInfo = function(info){
		ContactFactory.sendNewContactInfo(user._id, info).then(function(response){
			console.log('contact info succesfully added')
			$state.go('payment');
		});
	};

	$scope.contactType = ['shipping', 'billing', 'home', 'event'];
	$scope.states = united.states;

    $scope.open = function (size, title) {

        var modalInstance = $modal.open({
            animation: true,
            templateUrl: '/js/checkout/address.html',
            controller: 'addressCtrl',
            size: size,
            resolve: {
                title: function () {
                    return title;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

});

app.controller('addressCtrl', function($scope, title){
    $scope.title = title;
});