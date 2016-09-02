'use strict';

angular.module('splitpipeApp')

.controller('TeamsCtrl', function($scope, $http) {
	$http.get('data/teams.json').then(function(teamsResponse) {
		$scope.teams = teamsResponse.data;
	});
});
