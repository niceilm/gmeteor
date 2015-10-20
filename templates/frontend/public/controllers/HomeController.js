APP().controller("HomeController", HomeController);

HomeController.$inject = ["$scope"];

function HomeController($scope) {
  $scope.message = "Hello world";
}