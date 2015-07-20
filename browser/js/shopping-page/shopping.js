app.config(function ($stateProvider){
	$stateProvider.state('shopping',{
		url: '/',
        templateUrl: 'js/shopping-page/shopping.html',
        controller: 'ShoppingController'
	});
});

app.controller('ShoppingController', function ($scope, ProductFactory, CategoryFactory){

	ProductFactory.getProduct().then(function (response) {
		$scope.products = response;
	});

	CategoryFactory.getCategories().then(function(response){
		$scope.categories = {
            type: 'select',
            name: 'Service',
            value: {name: "All", $$hashKey: "object:60"},
            values: response
        };
		$scope.categories.values.unshift({name:"All"});
	});
	
	$scope.filterProducts = function(){
		var categoryId = $scope.categories.value._id;
		ProductFactory.getProduct(categoryId).then(function(response){
			$scope.products = response;
		});	
	}



});

// app.filter('category', ["$filter", function($filter){
	
// }]);