app.factory('CategoryFactory', function($http){
	return{
		getCategories: function(){
			
			return $http.get('/api/category').then(function(response){
				return response.data;
			})
		}
	}
})