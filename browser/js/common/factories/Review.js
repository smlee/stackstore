/**
 * Created by sang on 6/14/15.
 */
app.factory('ReviewFactory', function($http){
    return {
        getReviews: function(id){
            return $http.get('/api/review/'+id).then(function (reviews) {
                return reviews.data;
            })
        }, 
        postReviews: function(review){
        	console.log('hit post reviews!!');
        	return $http.post('/api/review', {params: review}).then(function(review){
        		return review.data;
        	})
        }
    }
});