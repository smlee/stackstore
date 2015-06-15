app.factory('ContactFactory', function($http){
	return {
		sendNewContactInfo: function(userId, contactInfo){
			console.log('inside sendNewContactInfo', contactInfo)
			return $http.post('/api/contact', {params: {_id: userId, contact: contactInfo}})
			.then(function(response){
				return response.data;
			})
		}
	}
})