    
app.controller('CategoryController', function ($scope, $timeout, $location, $rootScope, $anchorScroll) {
    $scope.cout = 0;
    $scope.pageCount = Math.ceil($rootScope.subjects.length / 6);
  
  
    $scope.prev = function () {
      if ($scope.cout > 0) {
        $scope.cout -= 6;
      }
    
    }
    $scope.next = function () {
      if ($scope.cout < ($scope.pageCount - 1 ) * 6) {
        $scope.cout += 6;
      }
    }
   

   
  });
  
  