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

  $scope.edit = function(index, medInfo){
    $scope.editView = true
    $scope.editName = medInfo.name
    
    var split1 = medInfo.dosage.split(" ")

    $scope.editAmount = split1[0]
    $scope.editForm = split1[1]
    $scope.editInterval = split1[3]
    $scope.editDuration = split1[4]

    $scope.saveEditMedication=function(){
      $scope.Medlist[index] = {
        name: $scope.editName,
        dosage: $scope.editAmount + " " + $scope.editForm + " " + "every" + " " + $scope.editInterval + " "+ $scope.editDuration
      } 
      $scope.editView = false

       $http.post("https://childcare-data-service.herokuapp.com/child/"+ $scope.childSelection.id + "/medication",
        $scope.Medlist)
    }
  }

  $scope.cancelEditMedication=function(){
    $scope.editView = false
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