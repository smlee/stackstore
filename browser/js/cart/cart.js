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
        			return CartFactory.getCarts(user._id)
        		})
        	}
        }
    });

});

app.controller('CartCtrl', function ($scope, user, carts, $state, CartFactory) {

	$scope.user = user;
    $scope.carts = carts;

	

    $scope.editItem = function (cartid, itemid, newInfo) {
    	CartFactory.editItem(cartid, itemid, newInfo)
    	.then(function (updatedOrders) {
    		$scope.carts = updatedOrders
    	})
    };

    $scope.removeItem = function (cartid, itemid) {
    	CartFactory.removeItem(cartid, itemid)
    	.then(function (response) {
    	})
    };

    $scope.submitOrder = function (cartid) {
    	CartFactory.submitOrder(cartid)
    	.then(function () {

    	}) 
    }

});