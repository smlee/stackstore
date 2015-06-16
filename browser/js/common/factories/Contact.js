app.factory('ContactFactory', function($http){
    return {
        sendNewContactInfo: function(userId, contactInfo){
            console.log('inside sendNewContactInfo', contactInfo)
            return $http.post('/api/contact', {params: {_id: userId, contact: contactInfo}})
                .then(function(response){
                    return response.data;
                })
        },

        getContacts: function(userId) {
            return $http.get('api/contact/'+userId).then(function(contacts){
                return contacts.data;
            })
        }
    }
})