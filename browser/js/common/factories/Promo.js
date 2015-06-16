app.factory('PromosFactory', function($http){
	return{
		getAllPromos: function () {
			return $http.get('/api/promo').then(function(promos){				
				return promos.data;
			});
		},

		updatePromo: function(promo) {
			return $http.put('/api/promo', promo).then(function(response){
				return response.data;
			});
		},

		deletePromo: function(promo) {
			return $http.delete('/api/promo/' + promo._id).then(function(response){
				return response.data;
			});
		},

		addPromos: function(promo){
			return $http.post('/api/promo', promo).then(function(response){
				return response.data;
			});
		}

	};
});