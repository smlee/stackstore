app.factory('EventsFactory', function($http){
	return{
		getEvents: function (id) {
			if(id){
				return $http.get('/api/event/'+id).then(function(event){
					return event.data;
				});
			} else {
				return $http.get('/api/event').then(function(events){
					return events.data;
				});
			}
		},
		updateEvents: function(eventId, event) {
			return $http.put('/api/event/'+eventId, user).then(function(){
				return;			
			});
		}
	}
});