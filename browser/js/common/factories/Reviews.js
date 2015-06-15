app.factory('ReviewsFactory', function($http){
	return{
		getReviews: function (id) {
			return $http.get('/api/review/'+id).then(function(review){
				return review.data;
			});
		},
		updateReview: function(review) {
			return $http.put('/api/review/', review).then(function(response){
				return response.data;			
			});
		}
	}
});