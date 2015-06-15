app.config(function ($stateProvider) {

    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: 'CartCtrl',
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

app.controller('CartCtrl', function ($scope, user, carts, $state, CartFactory, AuthService) {

	$scope.user = user;
    $scope.cart = carts;

    $scope.editItem = function (cartid, itemid, newInfo, idx) {
        if (AuthService.isAuthenticated()) {
            CartFactory.editItem(cartid, itemid, newInfo)
                .then(function (updatedOrders) {
                    $scope.carts = updatedOrders
                });
        }
        CartFactory.editLocal(idx, newInfo);

    };

    $scope.removeItem = function (cartid, itemid, idx) {
        console.log('what is cartid', cartid);
        if (AuthService.isAuthenticated()) {
            CartFactory.removeItem(cartid, itemid);
        }

        CartFactory.removeItemLocal(idx, itemid);
        // removes from view
        $scope.cart.all_items.splice(idx,1);
        $scope.cart = $scope.cart;
    	
    };

    $scope.submitOrder = function (cartid) {
    	CartFactory.submitOrder(cartid)
    	.then(function () {

    	}) 
    }

});