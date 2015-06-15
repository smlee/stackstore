/**
 * Created by sangmin on 6/15/15.
 */
app.factory('RegisterFactory', function($http) {
    return {
        newUser: function(newInfo) {
            return $http.post('/api/register', {
                params: newInfo
            }).then(function(result) {
                return result.data;
            })
        }
    }
});