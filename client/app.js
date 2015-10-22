var myApp = angular.module('wpApp',[
	]);

myApp.controller('navCtrl', ['$scope','Content', function($scope, Content){

	$scope.goTo = function(num){
		switch(num){
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
	
}])

myApp.controller('homeCtrl', ['$scope', 'Content', function($scope, Content) {
	console.log("controller invoked");
	$scope.content = Content;
	$scope.toggle = function() {
		console.log("CLICK");
	};

}]);


myApp.factory('Content', function () {
    return { 
    	heading: "Welcome",
    	intro: "Sometimes people do stupid things, like not doing their home work. Scroll on to read more...",
    	aboutText: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    };
});