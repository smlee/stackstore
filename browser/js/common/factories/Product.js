app.factory('ProductFactory', function($http){
	return{
		getProduct: function () {
			$http.get('/api/someroute').then(function(response){
				return response.data;
			});
		},

		getCart: function () {
			$http.get('/api/someroute').then(function(response){
				return response.data;
			});
		},

		addCart: function (item) {
			console.log('helllooo!!!');
			$http.post('/api/someroute').then(function(response){
				return response.data;
			});
		},

		addWish: function (item) {
			$http.post('/api/someroute').then(function(response){
				return response.data;
			});
		}
	}
});