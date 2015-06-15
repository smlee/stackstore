app.config(function ($stateProvider) {

    $stateProvider.state('payment', {
        url: '/payment',
        templateUrl: 'js/payment/payment.html',
        controller: 'PaymentCtrl'
    });

});

app.controller('PaymentCtrl', function($scope, CartFactory, $state){
	$scope.creditCards = ['Visa', 'Master Card', 'Discover', 'AMEX'];
	$scope.months = [1,2,3,4,5,6,7,8,9,10,11,12];
	$scope.years = [2015, 2016, 2017, 2018, 2019, 2020];

	var cartId = CartFactory.getFromLocalStorage()._id;
	console.log('this is cart id in paymentCtrl', cartId)
	$scope.sendCardInfo = function(info){
		console.log('this is the user\'s card info!!!!', info);

		CartFactory.updateStatus(cartId, {paid: true}).then(function(response){
			$state.go('invoice');
		});
		

	}
})