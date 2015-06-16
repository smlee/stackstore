app.config(function ($stateProvider) {
	$stateProvider.state('order-history', {
		url: '/history',
		templateUrl: 'js/order-history/history.html',
		controller: 'HistoryCtrl',
		resolve: {
        	user: function (AuthService) {
        		return AuthService.getLoggedInUser()
        	},
        	carts: function (AuthService, CartFactory) {
        		return AuthService.getLoggedInUser()
        		.then(function (user) {
        			if (user) return CartFactory.getCarts(user._id)
                    return CartFactory.getFromLocalStorage();
        		});
        	}
        }
	});
});

app.controller('HistoryCtrl', function ($scope, CartFactory, user, $modal, $log){
	$scope.headers = ["Invoice", "Product", "Quantity", "Price", "Order Status"];
	$scope.orders;

	CartFactory.getOrderHistory(user._id).then(function(orders){
		console.log('this be the orders', orders);
		$scope.orders = orders;
	});

	$scope.user = user._id;

	$scope.open = function (size, title, productId) {

        var modalInstance = $modal.open({
            animation: true,
            templateUrl: '/js/order-history/review.html',
            controller: 'ReviewCtrl',
            size: size,
            resolve: {
                title: function () {
                    return title;
                },
                product: function() {
                	return productId;
                },
                user: function() {
                	return $scope.user;
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

app.controller('ReviewCtrl', function ($scope, title, $modalInstance, ReviewFactory, product, user, $state, $location){
	$scope.title = title;
	// $scope.rate = 7; this is the # u wanna send to back-end
  	$scope.max = 5;
  	$scope.isReadonly = false;
  	$scope.cancel = function() {
  		$modalInstance.dismiss('cancel');
  	}

  	$scope.review = {
  		art_id: product,
  		user_id: user,
  		content: null,
  		rating: null
  	}

  	$scope.sendReview = function(review){
  		console.log('hit send review!!!', review)
  		ReviewFactory.postReviews(review).then(function(response){
  			console.log('success!');
  			$modalInstance.close();
  		});
  	}
});










