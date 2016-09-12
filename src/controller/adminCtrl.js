'use strict';

angular
    .module('splitpipeApp')

    .controller(
        'AdminCtrl',
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
              url : "php/admin.php",
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
                      console.log("buh");
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

          $scope.importAll = function() {
            console.log("importAll");
            $http({
              method : "post",
              url : "php/admin.php",
              data : {
                action : "importAll",
                args : {
                  league_shortcut : "bl1",
                  league_season : "2016"
                }
              },
              headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
              }
            }).success(function(data) {
              $scope.testresult = data;
              loadAll();
            }).error(function(data, status, headers, config) {
              $scope.status = status;
            });

          };

          $scope.deleteAll = function() {
            console.log("deleteAll");
            $http({
              method : "post",
              url : "php/match.php",
              data : {
                action : "deleteAll",
                args : {
                  league_shortcut : "bl1",
                  league_season : "2016"
                }
              },
              headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
              }
            }).success(function(data, status, headers, config) {
              $scope.testresult = data;
              loadAll();
            }).error(function(data, status, headers, config) {
              $scope.status = status;
            });

          };

          $scope.getTemplate = function(match) {
            console.log(match.matchId);
            if (match.matchId === $scope.selected.matchId) {
              return 'edit';
            } else {
              return 'display';
            }
          };
          $scope.reset = function() {
            $scope.selected = {};
          };

          $scope.editMatch = function(match) {
            $scope.selected = angular.copy(match);
          };

          // ////////////////////

          $scope.modifyQuotes = function(match) {
            console.log("modifyQuotes");
            $scope.editingData[match.matchId].showEditingQuotes = true;
            $scope.editingData[match.matchId].showPrimary = false;
            $scope.editingData[match.matchId].isModifyQuotes = true;
          };

          $scope.executeModifyQuotes = function(match) {
            console.log("executeModifyQuotes");
            console.log(match);
            $http({
              method : "post",
              url : "php/admin.php",
              data : {
                action : "upadteQuotes",
                args : {
                  match : match
                }
              },
              headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
              }
            }).success(function(data, status, headers, config) {
              $scope.testresult = data;
              loadAll();
            }).error(function(data, status, headers, config) {
              $scope.status = status;
            });
          };

          $scope.modifyResult = function(match) {
            console.log("modifyResult");
            $scope.editingData[match.matchId].showEditingResult = true;
            $scope.editingData[match.matchId].showPrimary = false;
            $scope.editingData[match.matchId].isModifyResult = true;
          };

          $scope.executeModifyResult = function(match) {
            console.log("executeModifyResult");
            $http({
              method : "post",
              url : "php/admin.php",
              data : {
                action : "upadteMatch",
                args : {
                  match : match
                }
              },
              headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
              }
            }).success(function(data, status, headers, config) {
              $scope.testresult = data;
              loadAll();
            }).error(function(data, status, headers, config) {
              $scope.status = status;
            });
          };

          $scope.reset = function(match) {
            $scope.editingData[match.matchId].showEditingQuotes = false;
            $scope.editingData[match.matchId].showEditingResult = false;
            $scope.editingData[match.matchId].showPrimary = true;
            $scope.editingData[match.matchId].isModifyQuotes = false;
            $scope.editingData[match.matchId].isModifyResult = false;
          };

        });
