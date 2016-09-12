'use strict';

angular.module('splitpipeApp').config(
    [ '$routeProvider', function($routeProvider) {
      $routeProvider.when('/', {
        templateUrl : 'ranking.html'
      }).when('/tipps', {
        templateUrl : 'tipps.html'
      }).when('/results', {
        templateUrl : 'results.html'
      }).when('/admin', {
        templateUrl : 'admin.html'
      }).when('/test', {
        templateUrl : 'test2.html'
      }).when('/about', {
        templateUrl : 'about.html'
      }).otherwise({
        redirectTo : '/'
      });
    } ]);
