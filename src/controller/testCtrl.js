'use strict';

angular
    .module('splitpipeApp')

    .controller(
        'TestCtrl',
        function($scope, $http) {

          loadAll();
          function loadAll() {
            console.log("loadAll");
            $http({
              method : "post",
              url : "php/test.php",
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
              url : "php/test.php",
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
              url : "php/test.php",
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
        });
