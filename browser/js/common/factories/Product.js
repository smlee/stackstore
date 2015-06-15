app.factory('ProductFactory', function($http){
	return{
		getProduct: function (category) {
			var queryParams = {};
			if(category){ queryParams.category = category; }
			return $http.get('/api/art', {params: queryParams}).then(function(response){
				return response.data;
			});
		},
		getPicture: function(prodId){
			console.log('this is prodId in getPicture', prodId.id)
			return $http.get('/api/art/' + prodId.id).then(function(response){
				console.log('this is response from getPicture', response)
				return response.data;
			})
		},
		getCart: function () {
			return $http.get('/api/art').then(function(response){
				return response.data;
			});
		},

		addCart: function (item) {
			return $http.post('/api/art').then(function(response){
				return response.data;
			});
		},

		addWish: function (item) {
			return $http.post('/api/art').then(function(response){
				return response.data;
			});
		},
		updateProduct: function(art) {
			return $http.put('/api/art/', art).then(function(response){
				return response.data;			
			});
		} 
	}
});