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

	var rand = function () {
		return Math.floor(Math.random()*10);
	};
	$scope.num = rand();

	$scope.gradients = [];
	$scope.colors = [];

	$scope.error = "";


	$scope.content = Content;
	$scope.toggle = function() {
		console.log("CLICK");
	};


	$scope.addItem = function (color) {
		$scope.num = rand();


		console.log(color);
		color = "#"+color;

		console.log(color);

		var regex  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;

		if(typeof color === "undefined" || color == null || color == ""){
			// Show error message
		}else{
			if(regex.test(color)) {
				permute(color);
			}else{
				$scope.error = "Please type a valid HEX color without #";
				console.log("error happened");
			}
		}
		$scope.color= "";
	};

	var permute = function(newColor){
		console.log("permuting");
		if($scope.colors < 1){
			$scope.colors.push(newColor);
			$scope.error = "Please add another color to create a gradient!";
		}else{
			$scope.error = "";
			$scope.colors.forEach(function (curr, index, arr) {
				console.log(curr);
				$scope.gradients.push([newColor, curr])
			});
			$scope.colors.push(newColor);
		}
		console.log($scope.colors);
		console.log($scope.gradients);
	}
}]);


myApp.factory('Content', function () {
	return {
		heading: "Gradient Mixer!",
		intro: "This is a simple app that creates permutations of all colors you put in. Enjoy!"
	};
});