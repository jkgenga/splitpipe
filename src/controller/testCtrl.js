'use strict';

angular
    .module('splitpipeApp')

    .controller(
        'TestCtrl',
        function($scope, $http) {

          $scope.matches = [];
          loadAll();

          var tableControl = {
            showEditing : false,
            showPrimary : true,
            isModify : false,
            isAdd : false,
            isRemove : false
          }

          function loadAll() {
            console.log("loadAll");
            $http({
              method : "post",
              url : "php/match.php",
              data : {
                action : "loadAll"
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
              url : "php/match.php",
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

          $scope.modify = function(match) {
            console.log("modify");
            $scope.editingData[match.matchId].showEditing = true;
            $scope.editingData[match.matchId].showPrimary = false;
            $scope.editingData[match.matchId].isModify = true;
          };

          $scope.executeModify = function(match) {
            console.log("executeModify");
            console.log(match);
            $http({
              method : "post",
              url : "php/match.php",
              data : {
                action : "update",
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

          $scope.add = function(match) {
            console.log("add");
            $scope.editingData[match.matchId].showEditing = true;
            $scope.editingData[match.matchId].showPrimary = false;
            $scope.editingData[match.matchId].isAdd = true;
          };

          $scope.executeAdd = function(match) {
            console.log("executeAdd");
            $http({
              method : "post",
              url : "php/match.php",
              data : {
                action : "add",
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

          $scope.remove = function(match) {
            console.log("remove");
            $scope.editingData[match.matchId].showPrimary = false;
            $scope.editingData[match.matchId].isRemove = true;
          };

          $scope.executeRemove = function(match) {
            console.log("executeRemove");
            $http({
              method : "post",
              url : "php/match.php",
              data : {
                action : "remove",
                args : {
                  match : match
                }
              },
              headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
              }
            }).success(function(data, status, headers, config) {
              console.log(data);
              $scope.testresult = data;
              // $scope.reset();
              loadAll();
            }).error(function(data, status, headers, config) {
              $scope.status = status;
            });
          };

          $scope.reset = function(match) {
            $scope.editingData[match.matchId].showEditing = false;
            $scope.editingData[match.matchId].showPrimary = true;
            $scope.editingData[match.matchId].isModify = false;
            $scope.editingData[match.matchId].isAdd = false;
            $scope.editingData[match.matchId].isRemove = false;
          };

        });
