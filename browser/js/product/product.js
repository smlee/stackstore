app.config(function ($stateProvider){
    $stateProvider.state('product',{
        url: '/product/:id',
        templateUrl: 'js/product/product.html',
        controller: 'ProductController',
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
            },
            reviews: function(ReviewFactory, $stateParams) {
                return ReviewFactory.getReviews($stateParams.id)
            }
        }
    });
});

<<<<<<< HEAD
app.controller('ProductController', function ($scope, $stateParams, user, carts, ProductFactory, CartFactory, ReviewsFactory, AuthService){
	console.log('this is stateParams', $stateParams.id);
	console.log('this is just stateParams', $stateParams);
	
	$scope.cart = {
		total: 0,
		items: [],
		quantity: 0
	};
	$scope.product;


	ProductFactory.getPicture($stateParams).then(function(prod) {
		console.log('INSIDE! product', prod);
		$scope.picture = prod;
		$scope.product = prod;
		return prod
	})
	.then(function(prod){
		ReviewsFactory.getReviews(prod._id).then(function(review){
			$scope.reviews = review
			console.log('prodreview', $scope.review)
		})
	});



	// ProductFactory.getCart()
	// .then(function (cart) {
	// 	$scope.cart = cart
	// }) 
	
	$scope.addcart = function(product, qty){
		// ProductFactory.addCart();
		$scope.cart.total += $scope.product.price;
		$scope.cart.quantity++;

		var cart = {all_items: [{art: product, quantity: qty}], order_type: "order", paid: false };
		if(user) CartFactory.pushItem(carts._id, cart) 
		else CartFactory.addToLocalStorage(cart);

	};
=======
app.controller('ProductController', function ($scope, $stateParams, user, carts, reviews, ProductFactory, CartFactory){
    console.log('this is stateParams', $stateParams.id);
    console.log('this is just stateParams', $stateParams);

    $scope.cart = {
        total: 0,
        items: [],
        quantity: 0
    };
    $scope.product;
    $scope.reviews = reviews;


    ProductFactory.getPicture($stateParams).then(function(prod) {
        console.log('INSIDE! product', prod);
        $scope.picture = prod;
        $scope.product = prod;
    });

    // ProductFactory.getCart()
    // .then(function (cart) {
    // 	$scope.cart = cart
    // }) 

    $scope.addcart = function(product, qty){
        // ProductFactory.addCart();
        $scope.cart.total += $scope.product.price;
        $scope.cart.quantity++;

        var cart = {all_items: [{art: product, quantity: qty}], order_type: "order", paid: false };
        if(user) CartFactory.pushItem(carts._id, cart)
        else CartFactory.addToLocalStorage(cart);

    };
>>>>>>> a42f60373a2929ac06658928e22f55ca67d6806c
});