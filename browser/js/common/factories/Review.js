/**
 * Created by sang on 6/14/15.
 */
app.factory('ReviewFactory', function($http){
    return {
        getReviews: function(id){
            return $http.get('/api/review/'+id).then(function (reviews) {
                return reviews.data;
            })
        }
    }
});