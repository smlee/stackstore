app.factory('EventsFactory', function($http){
	return{
		getEvents: function (id) {
			if(id){
				return $http.get('/api/event/'+id).then(function(event){
					return event.data;
				});
			} else {
				return $http.get('/api/event').then(function(events){
					console.log(events)
					return events.data;
				});
			}
		}
	}
});