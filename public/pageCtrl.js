angular.module("pageCtrl", [])
.controller("PageController", function($scope, $http){
  var updateChildrenView = function(){
    $http.get("https://childcare-data-service.herokuapp.com/child")
      .success(function(data){
        $scope.childrenList = data
      }) 
  }

  $scope.selectedChild = function(child){
    $scope.childSelection = child
  }

  updateChildrenView()

})