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


//var startState = {
//		name : 'start',
//		url : '/start',
//		template : '<h3>Start!</h3>'
//	}
//
//var tippsState = {
//		name : 'tipps',
//		url : '/tipps',
//		template : '<h3>Tipps!</h3>'
//	}
//
//var resultsState = {
//		name : 'results',
//		url : '/results',
//		template : '<h3>Spielstand!</h3>'
//	}
//
//var adminState = {
//		name : 'admin',
//		url : '/admin',
//		template : admin.html
//	}
//
//var testState = {
//		name : 'test',
//		url : '/test',
//		template : '<h3>Test!</h3>'
//	}
//
//var aboutState = {
//	name : 'about',
//	url : '/about',
//	template : '<h3>Über!</h3>'
//}
//
//$stateProvider.state(startState);
//$stateProvider.state(tippsState);
//$stateProvider.state(resultsState);
//$stateProvider.state(adminState);
//$stateProvider.state(testState);
//$stateProvider.state(aboutState);
