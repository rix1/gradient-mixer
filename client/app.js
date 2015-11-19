var myApp = angular.module('myApp',[
	'myApp.directives.gradient'
]);

myApp.controller('navCtrl', ['$scope', 'Content', function ($scope, Content) {

}]);

myApp.controller('homeCtrl', ['$scope', 'Content', function($scope, Content) {

	// First, checks if it isn't implemented yet.
	if (!String.prototype.format) {
		String.prototype.format = function() {
			var args = arguments;
			return this.replace(/{(\d+)}/g, function(match, number) {
				return typeof args[number] != 'undefined'
					? args[number]
					: match
					;
			});
		};
	}

	var exportGradients = {}; // Object containing the gradients that are to be exported


	var rand = function () {
		return Math.floor(Math.random()*10);
	};
	$scope.num = rand();

	$scope.gradients = [];
	$scope.colors = [];

	$scope.error = "";

	$scope.content = Content;

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
		var iterations = newColors.length; // Javascript apparently checks the length of the array at each iteation.

		if ($scope.colors < 1) { 						// No colors exists prior to this
			$scope.colors.push(newColors.pop());
			$scope.error = (iterations > 1) ? '': "Please add another color to create a gradient!";
			iterations--;
		}

		for(var i = 0; i< iterations; i++){
			var temp = newColors.pop();

			$scope.colors.forEach(function (curr) {
				$scope.gradients.push([temp, curr, $scope.gradients.length]);
			});
			$scope.colors.push(temp);
		}
	};

	$scope.exportCSS = function (arr, show) {
		if(show){
			exportGradients[arr[2]] = arr;
		}else{
			delete exportGradients[arr[2]];
		}
		generateCSS();
	};


	var generateCSS = function () {
		$scope.generated_css = "";
		var cssTemplate = " \
// Color #{0} \n\
	background: -webkit-linear-gradient(left, {1}, {2}); /* For Safari 5.1 to 6.0 */ \n\
	background: -o-linear-gradient(left, {1}, {2}); /* For Opera 11.1 to 12.0 */ \n\
	background: -moz-linear-gradient(left, {1}, {2}); /* For Firefox 3.6 to 15 */ \n\
	background: linear-gradient(left, {1}, {2}); /* Standard syntax */ \n\
	";
		var counter = 0;
		for (var key in exportGradients) {
			if (exportGradients.hasOwnProperty(key)) {
				$scope.generated_css += "\n\n" + cssTemplate.format(counter, "#"+exportGradients[key][0], "#"+exportGradients[key][1]);
			}
			counter ++;
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