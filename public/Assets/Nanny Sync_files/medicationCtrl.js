angular.module("medicationCtrl", [])
.controller("MedicationController", function($scope, $http){
  $scope.nameTitle = $scope.childSelection.name+ ":"
  $scope.del=function(data){
    $scope.Medlist.splice(data, 1)
    $http.post("https://childcare-data-service.herokuapp.com/child/"+ $scope.childSelection.id + "/medication",
        $scope.Medlist).success(function() {
           console.log("HI")
        })
  }
  /*Update medication View*/
  console.log($scope) 
  var updateMedicationView = function(){
    $http.get("https://childcare-data-service.herokuapp.com/child/" + $scope.childSelection.id + "/medication")
      .success(function(data){
        $scope.Medlist = data || []
      })  
    }

  updateMedicationView()

  /*Add new solid*/
  $scope.saveNewMed = function(){

    $scope.Medlist.unshift({
      name: $scope.name,
      dosage: $scope.amount + " " + $scope.form + " " + "every" + " " + $scope.interval + " "+ $scope.duration
    })
    $http.post("https://childcare-data-service.herokuapp.com/child/" + $scope.childSelection.id + "/medication",
        $scope.Medlist).success(function() {
            $scope.name = ""
            $scope.amount = ""
            $scope.form = ""
            $scope.interval = ""
            $scope.duration = ""
        })
  }

  

})