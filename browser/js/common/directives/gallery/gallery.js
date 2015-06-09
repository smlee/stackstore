app.directive('gallery', function(){
	return{
		restrict: "E",
		templateUrl: 'js/common/directives/gallery/gallery.html',
		link: function(scope, element, attr){
			scope.slides = [{image: 'http://i.imgur.com/8Pwm8dK.jpg', text:'Single Ladies'}, {image: 'http://i.imgur.com/SZYzKvd.png', text:'something'}, {image: 'http://i.imgur.com/hRH53rw.jpg', text:'yay!'}];
			scope.myInterval = 2000;
		}
	};
	
});
