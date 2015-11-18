angular.module('myApp.directives.gradient', [])
    .directive('gradient', [function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                colors: '='
            },
            controller: 'gradientCtrl',
            templateUrl: "components/gradient/gradient.html"
        };
    }])

    .controller('gradientCtrl', ['$scope', function($scope) {
        $scope.checked = false;

        if($scope.colors.length < 2){
            $scope.colors.push($scope.colors[0]);
            console.log("adding colors");
        }
        console.log($scope.colors);
    }]);