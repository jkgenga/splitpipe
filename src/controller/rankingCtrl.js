'use strict';

angular.module('splitpipeApp')

.controller('RankingCtrl', function($scope, $http) {
	$http.get('data/ranking.json').then(function(rankingResponse) {
		$scope.ranking = rankingResponse.data;
	});
});
