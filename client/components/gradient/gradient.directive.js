angular.module('myApp.directives.gradient', [])
    .directive('gradient', [function () {
        return {
            restrict: 'E',
            scope: {
                colors: '=',
                addToExport: "&"
            },
            controller: 'gradientCtrl',
            templateUrl: "components/gradient/gradient.html"
        };
    }])

    .controller('gradientCtrl', ['$scope', function($scope) {
        var DARK_TRESHOLD = 284; // Text below this threshold should be white!
        $scope.textcolor = "black";
        $scope.checked = false;

        if($scope.colors.length < 2){
            $scope.colors.push($scope.colors[0]);
            console.log("adding colors");
        }

        $scope.click = function () {
            $scope.checked = !$scope.checked;
            $scope.addToExport({arg1:$scope.colors, arg2:$scope.checked});
        };


        (function(){
            var color1 = hexToR($scope.colors[0]) + hexToG($scope.colors[0]) + hexToB($scope.colors[0]);
            var color2 = hexToR($scope.colors[1]) + hexToG($scope.colors[1]) + hexToB($scope.colors[1]);

            var sum = (color1 + color2) / 2;
            console.log(sum);
            if(sum < DARK_TRESHOLD){
                $scope.textcolor = "white";
            }else{
                console.log("SUM WAS: " + sum);
            }
        })();

        function hexToR(h) {
            return (h.length < 6) ? parseInt(h.substring(0,1),16) : parseInt(h.substring(0,2),16);
        }
        function hexToG(h) {
            return (h.length < 6) ? parseInt(h.substring(1, 2), 16) : parseInt(h.substring(2, 4), 16);
        }
        function hexToB(h) {
            return (h.length < 6) ? parseInt(h.substring(2, 3), 16) : parseInt(h.substring(4, 6), 16)
        }
    }]);