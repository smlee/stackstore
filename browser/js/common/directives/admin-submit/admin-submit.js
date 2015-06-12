app.directive('adminSubmit', function () {
	return {
		restrict: 'E',
		// templateUrl: 'js/common/directives/admin-submit/admin-submit.html',
		scope: {
			inputValues: '='
		},
		link: function (scope, element) {
			console.log(scope)
			console.log('hello', scope.inputValues)
		}
	}
});