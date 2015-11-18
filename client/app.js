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

		var regex  = /([0-9A-F]{6})|([0-9A-F]{3})/ig;

		if(typeof color === "undefined" || color == null || color == ""){
			$scope.error = "Wow - weird error... I did not see that one coming.";
		}else{
			if(regex.test(color)) {
				var colors = color.match(regex);
				permute(colors);
			}else{
				$scope.error = "Please type one or more valid HEX colors";
			}
		}
		$scope.color= "";
	};

	var permute = function (newColors) {
		//console.log("the truth: "+ newColors);
		var iterations = newColors.length; // Javascript apparently checks the length of the array at each iteation.

		if ($scope.colors < 1) { 						// No colors exists prior to this
			$scope.colors.push(newColors.pop());
			$scope.error = (iterations > 1) ? '': "Please add another color to create a gradient!";
			iterations--;
		}

		for(var i = 0; i< iterations; i++){
			var temp = newColors.pop();

			$scope.colors.forEach(function (curr) {
				$scope.gradients.push([temp, curr]);
			});
			$scope.colors.push(temp);
		}
	};
}]);


myApp.factory('Content', function () {
	return {
		heading: "Gradient Mixer!",
		intro: "This is a simple app that creates permutations of all colors you type in the field below. Enjoy!",
		tip: "Tip: Paste many colors at once! Click on the gradients to expand."

	};
});