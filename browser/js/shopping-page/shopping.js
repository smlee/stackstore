app.config(function ($stateProvider){
	$stateProvider.state('shopping',{
		url: '/shopping',
        templateUrl: 'js/shopping-page/shopping.html',
        controller: 'ShoppingController'
	});
});

app.controller('ShoppingController', function ($scope, ProductFactory, CategoryFactory){	

	ProductFactory.getProduct().then(function (response) {
		$scope.products = response;
	});

	CategoryFactory.getCategories().then(function(response){
		$scope.categories = response;
	});
	
	$scope.filterProducts = function(){
		var categoryId = $scope.categoryName._id
		ProductFactory.getProduct(categoryId).then(function(response){
			$scope.products = response;
		});	
	}
});

// app.filter('category', ["$filter", function($filter){
	
// }]);