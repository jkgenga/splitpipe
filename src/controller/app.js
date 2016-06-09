'use strict';

angular.module('tutorialApp', [ 'ngAnimate', 'ngRoute' ]).config(
    function($routeProvider) {
      $routeProvider.when('/', {
        templateUrl : 'tipps.html'
      }).when('/tipps', {
        templateUrl : 'gamedays.html'
      }).when('/about', {
        templateUrl : 'about.html'
      }).otherwise({
        redirectTo : '/'
      });
    }).controller('TeamsCtrl', function($scope, $http) {
  $http.get('data/teams.json').then(function(teamsResponse) {
    $scope.teams = teamsResponse.data;
  });
}).controller('TippsCtrl', function($scope, $http) {
  $http.get('data/tipps.json').then(function(tippsResponse) {
    $scope.tipps = tippsResponse.data;
  });
}).controller('GamedaysCtrl', function($scope, $http) {
  $http.get('data/gamedays.json').then(function(gamedaysResponse) {
    $scope.gamedays = gamedaysResponse.data;
  });
});
