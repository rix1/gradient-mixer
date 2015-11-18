var myApp = angular.module('myApp',[
	'myApp.directives.gradient'
]);

myApp.controller('navCtrl', ['$scope', 'Content', function ($scope, Content) {

	$scope.goTo = function (num) {
		switch (num) {
			case 1:
				Content.heading = "First page";
				break;
			case 2:
				console.log("number: " + num);
				Content.heading = "Second page";
				break;
			case 3:
				Content.heading = "Third page";
				console.log("number: " + num);
				break;
		}
	}

}]);

myApp.controller('homeCtrl', ['$scope', 'Content', function($scope, Content) {
	console.log("home controller invoked");
	var defaultColors = {colorA: "#00FF00", colorB: "#FFFF00"};

	$scope.content = Content;
	$scope.toggle = function() {
		console.log("CLICK");
	};

	$scope.gradients = [];

	$scope.addItem = function (color) {

		color.a = "#"+color.a;
		color.b = "#"+color.b;

		var isOk  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;

		if(typeof color === "undefined" || color == null || color == ""){
			// Show error message
		}else{
			//if(color.a.match(isOk).length > 0 && color.b.match(isOk).length > 0){
			if(isOk.test(color.a) && isOk.test(color.b)) {
				$scope.gradients.push(color);
			}
		}
		$scope.color= "";
	};

}]);


myApp.factory('Content', function () {
	return {
		heading: "Gradient Mixer!",
		intro: "This is a simple app that creates permutations of all colors you put in. Enjoy!"
	};
});