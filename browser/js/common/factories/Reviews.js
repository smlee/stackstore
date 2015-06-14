app.factory('ReviewsFactory', function($http){
	return{
		getReviews: function (id) {
			return $http.get('/api/review/'+id).then(function(review){
				return review.data;
			});
		}
	}
});