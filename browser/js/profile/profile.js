app.config(function ($stateProvider){

    $stateProvider.state('profileForm', {
        url: '/profile-form',
        templateUrl: 'js/profile/profile-form.html',
        controller: 'ProfileForm'
    });
});

app.controller('ProfileForm', function ($scope, AuthService, $state, ProfileFactory){

	$scope.profile = {}

	$scope.sendProfileInfo = function(profile){
		ProfileFactory.submit(profile);
		console.log('this is the profile', profile);
	}
	

});