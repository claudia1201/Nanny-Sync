angular.module("allergiesCtrl", [])
.controller("AllergiesController", function($scope, $http){

  $scope.nameTitle = $scope.childSelection.name + ":"
  
  $scope.del=function(data){
    $scope.Allergieslist.splice(data, 1)
    $http.post("https://childcare-data-service.herokuapp.com/child/"+ $scope.childSelection.id + "/allergies",
        $scope.Allergieslist).success(function() {
           console.log("HI")
        })
  }
  /*Update solids View*/
  var updateAllergiesView = function(){
    $http.get("https://childcare-data-service.herokuapp.com/child/" + $scope.childSelection.id + "/allergies")
      .success(function(data){
        $scope.Allergieslist = data || []
      }) 
    }
 
  updateAllergiesView()

  $scope.edit = function(index, allergyInfo){
    $scope.editView = true
    $scope.editName = allergyInfo.name
    $scope.editReaction= allergyInfo.reaction

    $scope.saveEditAllergy=function(){
      $scope.Allergieslist[index] = {
        name: $scope.editName,
        reaction: $scope.editReaction
      } 
      $scope.editView = false

       $http.post("https://childcare-data-service.herokuapp.com/child/"+ $scope.childSelection.id + "/allergies",
        $scope.Allergieslist)
    }
  }

  $scope.cancelEditAllergy=function(){
    $scope.editView = false
  }

  /*Add new solid*/
  $scope.saveNewAllergy = function(){

    $scope.Allergieslist.push({
      name: $scope.name,
      reaction: $scope.reaction
    })

    $http.post("https://childcare-data-service.herokuapp.com/child/" + $scope.childSelection.id + "/allergies",
        $scope.Allergieslist).success(function() {
            $scope.name = ""
            $scope.reaction= ""
        })
  }
})