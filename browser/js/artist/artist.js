app.config(function ($stateProvider){
	$stateProvider.state('artist',{
		url: '/artist',
        templateUrl: 'js/artist/artist-profile.html',
        controller: 'ArtistController'
	});
});

app.controller('ArtistController', function ($scope, ArtistFactory){

// add delete own profile button

});