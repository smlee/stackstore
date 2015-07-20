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
        			if (user){
                        return CartFactory.getCarts(user._id)
                    }
                    return CartFactory.getFromLocalStorage();
        		})
        	}
        }
    });

});

app.controller('CartCtrl', function ($scope, user, carts, $state, CartFactory, AuthService) {
    var quants = 0,subtotal = 0;
	$scope.user = user;
    $scope.cart = carts;



    $scope.editItem = function (cartid, itemid, newInfo, idx) {
        if (AuthService.isAuthenticated()) {
            CartFactory.editItem(cartid, itemid, newInfo)
                .then(function (updatedOrder) {
                    if(cartid){
                        CartFactory.getCartById(cartid).then(function(cart){
                            $scope.cart = cart;
                        });
                    }

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

    $scope.total = function(){

        $scope.cart.all_items.forEach(function (ele) {
            quants += ele.quantity;
            subtotal += ele.art.price*ele.quantity;
        });
        return {
            quantity: quants,
            sub: subtotal
        }
    };

    $scope.submitOrder = function (cartid) {
    	
    }

});