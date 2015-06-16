app.factory('UsersFactory', function($http){
	return{
		getUsers: function (id) {
			if(id){
				return $http.get('/api/user/'+id).then(function(user){
					return user.data;
				});
			} else {
				return $http.get('/api/user').then(function(users){					
					return users.data;
				});
			}
		},

		deleteUser: function(userId){
			return $http.delete('/api/user/'+userId).then(function(){
				return;			
			});
		},

		updateUser: function(userId, user){
			return $http.put('/api/user/'+userId, user).then(function(response){
				return response.data;			
			});
		},

		updateAllUsersWithProp: function(users){
			return $http.put('/api/user', users).then(function(response){
				return response.data;			
			});
		},

		updateUserPasswordByEmail: function (email) {
			return $http.put('/api/user/email', email).then(function(user){
				return user.data;
			});
		},

		sendEmail:  function(email){
			return $http.post('/api/user/email', email)
		}
	}
});