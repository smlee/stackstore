app.config(function ($stateProvider){
	$stateProvider.state('product',{
		url: '/product',
        templateUrl: 'js/product/product.html',
        controller: 'ProductController'
	});
});

app.controller('ProductController', function ($scope, ProductFactory){

	$scope.product = {
		name: 'My Temporary Product',
		artist_name: "Joanne Yae",
		price: 9001,
		description: "Awesome, amazing, breathtaking, gripping piece of art.",
		medium: "Watercolor with oil paints.",
		tags: ["Art", "Canvas", "Badass"],
		size: '24x30'
	}

	$scope.cart = {
		total: 0,
		items: [],
		quantity: 0
	}

	// ProductFactory.getProduct()
	// .then(function (product) {
	// 	$scope.product = product
	// }) 

	// ProductFactory.getCart()
	// .then(function (cart) {
	// 	$scope.cart = cart
	// }) 

	$scope.addcart = function(){
		ProductFactory.addCart();
		$scope.cart.total += $scope.product.price;
		$scope.cart.quantity++
	}

	$scope.addwish = function() {
		ProductFactory.addWish()
	}



});