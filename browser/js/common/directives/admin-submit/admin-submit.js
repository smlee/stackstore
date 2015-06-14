app.directive('adminSubmit', function () {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/admin-submit/admin-submit.html',
		scope: {
			inputs: '='
		},
		link: function (scope, element) {
			console.log(scope.inputs)
		}
	}
});