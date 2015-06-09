app.directive('zoom', function($compile){
	return {
		restrict: 'A',
		link: function(scope, element, attrs){
			element.on('click', function(e){
		
				// var xCoo = e.pageX;
				// var yCoo = e.pageY;
				// var origH  = e.target.clientHeight;  // original image height
				// var origW  = e.target.clientWidth; // original image width
				// // var resize = 150;
				// var ratio = origH / origW;
				// // var newH   = origH * (resize / 100);
				// // var newW   = origW * (resize / 100);
				// // var newH = origH + (20 * ratio);
				// // var newW = origH + (20 * ratio);
				// var left = xCoo - ((20 * ratio)/2);
				// var top = yCoo - ((20 * ratio)/2);

				// var zoomdiv = '<div class="zoomedImage"></div>'
				// var largeImg = '<img class="highRes" src="'+e.target.src+'"'+' />';
				// console.log(largeImg);
				// angular.element('.zoomedImage').append(largeImg);

				// var parent = element.parent();
				// parent.append(zoomdiv);
				// angular.element('.zoomedImage').css('height', '200px').css('width', '200px');
				// angular.element('.highRes').css('height', origH+"px")
				// 						.css('width', origW+"px")
				// 						.css('left', left+"px")
				// 						.css('top', top+"px");
				// // angular.element('.zoomedImage').css("background-attachment", "fixed")

			});
		}
	};
});