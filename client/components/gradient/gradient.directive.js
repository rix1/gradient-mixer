angular.module('myApp.directives.gradient', [])
    .directive('gradient', [function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                color1: '@',
                color2: '@'
            },
            controller: 'gradientCtrl',
            templateUrl: "components/gradient/gradient.html"
        };
    }])

    .controller('gradientCtrl', ['$scope', function($scope) {
        $scope.checked = false;
    }]);