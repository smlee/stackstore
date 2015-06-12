app.config(function ($stateProvider){
	$stateProvider.state('shopping',{
		url: '/shopping',
        templateUrl: 'js/shopping-page/shopping.html',
        controller: 'ShoppingController'
	});
});

app.controller('ShoppingController', function ($scope, ProductFactory, CategoryFactory){
	// $scope.categoryName = '';
	console.log('this is the model', $scope.categoryName)


	ProductFactory.getProduct().then(function (response) {
		$scope.products = response;
	});

	CategoryFactory.getCategories().then(function(response){
		$scope.categories = response;
	});

	$scope.filterProducts = function(){
		console.log('category Name INSIDE', $scope.categoryName._id)
		var categoryId = $scope.categoryName._id
		ProductFactory.getProduct(categoryId).then(function(response){
			console.log('we have a response folks!', response)
			$scope.products = response;
		});
		
	}
});