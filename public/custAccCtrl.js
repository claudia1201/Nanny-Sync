
angular.module("custAccCtrl", [])
.controller("CustAccController", function($scope, $http){
  /*Update feeding View*/ 
  var updateCustAccView = function(){
    $http.get("https://childcare-data-service.herokuapp.com/child")
      .success(function(data){
        $scope.Babylist = data
      })
    }

  updateCustAccView()

  /*Add new feeding*/
  $scope.saveNewBaby = function(){

      $http.post("https://childcare-data-service.herokuapp.com/child", {
        name: $scope.newBabyName
      }).success(function() {
           $scope.newBabyName = ""
           updateCustAccView()
        })
  }

})