var app = angular.module('profiles', ['ui.bootstrap']);

app.controller('ProfilesController', function($scope, $http, $filter) {
   $scope.filteredProfiles = []
  ,$scope.currentPage = 1
  ,$scope.page = 1
  ,$scope.numPerPage = 12
  ,$scope.maxSize = 5;

  $scope.$watch('currentPage + numPerPage', function() {
    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    , end = begin + $scope.numPerPage;
    $http.get('data/profiles2.json').
                    then(function onSuccess(response) {
                        angular.extend(this, response.data);
                        $scope.profiles = response.data.profiles;
                        console.log(response.data.profiles);
                        // $filter('filter')($scope.profiles, {name = $scope.filterName});
                        // console.log($scope.filterName);
                        // $scope.filterName = null;
                        // if ($scope.filterName != null) {$scope.profiles = $scope.profiles.filter(val => val.name.includes($scope.filterName))};
                        // $scope.filteredProfiles = $scope.profiles.slice(begin, end);
                        // console.log($scope.profiles.length);
                        // console.log($scope.filterName);


                        $scope.displayItems = $scope.profiles.slice(0, 12);
  
                        $scope.pageChanged = function() {
                          var startPos = ($scope.page - 1) * 12;
                          // $scope.displayItems = $scope.profiles.slice(startPos, startPos + 12);
                          console.log($scope.page);
                        };

                        $scope.filterNameChanged = function() {
                          $scope.page = 1;
                        };

                    }).
                    catch(function onError(response) {
                        console.log(response);
                    });
  });


});


app.run(function(paginationConfig){
   paginationConfig.firstText='Début';
   paginationConfig.previousText='Précédant';
   paginationConfig.nextText='Suivant';
   paginationConfig.lastText='Fin';
})