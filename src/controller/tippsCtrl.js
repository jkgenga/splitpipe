'use strict';

angular.module('splitpipeApp')

.controller('TippsCtrl', function($scope, $http) {
	$http.get('data/tipps.json').then(function(tippsResponse) {
		$scope.tipps = tippsResponse.data;
	});
});
