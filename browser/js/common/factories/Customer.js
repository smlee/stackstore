app.factory('CustomerFactory', function($http){
	return{
		submit: function(info){
			console.log('this is infor', info);
			$http.post('/api/someroute', info).then(function(response){
				return response.data;
			});
		}
	}
});