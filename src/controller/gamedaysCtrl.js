'use strict';

angular
		.module('splitpipeApp')
		
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
