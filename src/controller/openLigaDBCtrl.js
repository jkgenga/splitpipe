'use strict';

angular
		.module('splitpipeApp')
		.controller(
				'OpenLigaDBCtrl',
				function($scope, $filter, $http) {
					$http
							.get(
									'http://www.openligadb.de/api/getmatchdata/bl1/2016/')
							.then(
									function(matchesResponse) {
										$scope.matches = matchesResponse.data;

										$scope.predicate = 'name';
										$scope.reverse = true;
										$scope.currentPage = 1;
										$scope.order = function(predicate) {
											$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse
													: false;
											$scope.predicate = predicate;
										};
										$scope.totalItems = $scope.matches.length;
										$scope.numPerPage = 9;
										$scope.paginate = function(value) {
											var begin, end, index;
											begin = ($scope.currentPage - 1)
													* $scope.numPerPage;
											end = begin + $scope.numPerPage;
											index = $scope.matches
													.indexOf(value);
											return (begin <= index && index < end);
										};
									});

				});
