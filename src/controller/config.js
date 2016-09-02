'use strict';

angular.module('splitpipeApp').config(
    [ '$routeProvider', function($routeProvider) {
      $routeProvider.when('/', {
        templateUrl : 'ranking.html'
      }).when('/tipps', {
        templateUrl : 'tipps.html'
      }).when('/gamedays', {
        templateUrl : 'gamedays.html'
      }).when('/admin', {
        templateUrl : 'admin.html'
      }).when('/test', {
        templateUrl : 'test.html'
      }).when('/about', {
        templateUrl : 'about.html'
      }).otherwise({
        redirectTo : '/'
      });
    } ]);
