app.config(function ($stateProvider) {

    $stateProvider.state('reset', {
        url: '/reset',
        templateUrl: 'js/reset-password/reset.html',
        controller: 'ResetCtrl'
    });

    $stateProvider.state('adminReset', {
        url: '/admin-reset',
        templateUrl: 'js/reset-password/reset.html',
        controller: 'AdminResetCtrl'
    });

});

app.controller('ResetCtrl', function ($scope, AuthService, UsersFactory, $state) {
	$scope.login = {};
	var newPass = Math.random().toString(36).slice(-8);	

	$scope.resetPassword = function (userInfo){
		var obj = {
			email: userInfo.email,
			password: newPass
		};
		UsersFactory.updateUserPasswordByEmail(obj).then(function(saved){ 
			if(saved){
				$scope.displayMessage = "Password Updated";
				var email = {
					sendTOEmail: userInfo.email,
					sendFromEmail: "admin@ArtsyFartsy.com",
					message: "Your Password Has Been Reset. Your New Password is: " + newPass
				};
				UsersFactory.sendEmail(email);
			}
			else{				
				$scope.displayMessage = "Email Is Wrong"
			}
		});
	}
});

app.controller('AdminResetCtrl', function ($scope, AuthService, UsersFactory, $state) {
	$scope.displayMessage = "The Admin is requesting you change you password";
	$scope.login = {};
	var newPass = Math.random().toString(36).slice(-8);	

	$scope.resetPassword = function (userInfo){
		var obj = {
			email: userInfo.email,
			password: newPass
		};
		AuthService.getLoggedInUser().then(function(user){
			if(user){
				if(userInfo.email === user.email){
					UsersFactory.updateUserPasswordByEmail(obj).then(function(saved){
						if(saved){
							$scope.displayMessage = "Password Updated";
							var email = {
								sendTOEmail: userInfo.email,
								sendFromEmail: "admin@ArtsyFartsy.com",
								message: "Your Password Has Been Reset. Your New Password is: " + newPass
							};
							UsersFactory.sendEmail(email);
						}
						else{				
							$scope.displayMessage = "Email Is Wrong";
						}
					});
				}
				else {
					$scope.displayMessage = "Email Is Wrong"; 
				}
			}
		});
	}

});