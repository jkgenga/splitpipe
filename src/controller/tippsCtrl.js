'use strict';

angular
    .module('splitpipeApp')

    .controller(
        'TippsCtrl',
        function($scope, $http) {

          $scope.matches = [];
          $scope.matchData = {};
          $scope.selected = {};

          loadAll();

          var tableControl = {
            showEditingQuotes : false,
            showEditingResult : false,
            showPrimary : true,
            isModifyQuotes : false,
            isModifyResult : false,
          }

          function loadAll() {
            console.log("loadAll");
            $http({
              method : "post",
              url : "php/tippspiel.php",
              data : {
                action : "loadAll",
                args : {
                  empty : "empty"
                }
              },
              headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
              }
            })
                .then(
                    function successCallback(response) {
                      $scope.matches = response.data;
                      console.log("scope.matches.length = "
                          + $scope.matches.length);
                      $scope.editingData = {};
                      for (var i = 0, length = $scope.matches.length; i < length; i++) {

                        $scope.editingData[$scope.matches[i].matchId] = {
                          showEditing : false,
                          showPrimary : true,
                          isModify : false,
                          isAdd : false,
                          isRemove : false
                        };
                      }
                      $scope.predicate = 'matchId';
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
                        begin = ($scope.currentPage - 1) * $scope.numPerPage;
                        end = begin + $scope.numPerPage;
                        index = $scope.matches.indexOf(value);
                        return (begin <= index && index < end);
                      };
                    }, function errorCallback(response) {
                      // called asynchronously if an error occurs
                      // or server returns response with an error status.
                    });
          }
          ;

        });
