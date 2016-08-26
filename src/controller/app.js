'use strict';

angular
		.module('tutorialApp',
				[ 'ngAnimate', 'ngRoute', 'ui.bootstrap', 'ngResource' ])
		.config(function($routeProvider) {
			$routeProvider.when('/', {
				templateUrl : 'ranking.html'
			}).when('/tipps', {
				templateUrl : 'tipps.html'
			}).when('/gamedays', {
				templateUrl : 'gamedays.html'
			}).when('/about', {
				templateUrl : 'about.html'
			}).otherwise({
				redirectTo : '/'
			});
		})
		.controller('RankingCtrl', function($scope, $http) {
			$http.get('data/ranking.json').then(function(rankingResponse) {
				$scope.ranking = rankingResponse.data;
			});
		})
		.controller('TeamsCtrl', function($scope, $http) {
			$http.get('data/teams.json').then(function(teamsResponse) {
				$scope.teams = teamsResponse.data;
			});
		})
		.controller('TippsCtrl', function($scope, $http) {
			$http.get('data/tipps.json').then(function(tippsResponse) {
				$scope.tipps = tippsResponse.data;
			});
		})
		.controller(
				'GamedaysCtrl',
				function($scope, $filter, $http) {
					$http
							.get('data/gamedays.json')
							.then(
									function(gamedaysResponse) {
										$scope.gamedays = gamedaysResponse.data;

										$scope.predicate = 'name';
										$scope.reverse = true;
										$scope.currentPage = 1;
										$scope.order = function(predicate) {
											$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse
													: false;
											$scope.predicate = predicate;
										};
										$scope.totalItems = $scope.gamedays.length;
										$scope.numPerPage = 1;
										$scope.paginate = function(value) {
											var begin, end, index;
											begin = ($scope.currentPage - 1)
													* $scope.numPerPage;
											end = begin + $scope.numPerPage;
											index = $scope.gamedays
													.indexOf(value);
											return (begin <= index && index < end);
										};
									});

				});
