angular.module("solidsCtrl", [])
.controller("SolidsController", function($scope, $http){
  $scope.nameTitle = $scope.childSelection.name + ":"

  $scope.edit = function(index, solidInfo){
    $scope.editView = true
    
    var split1 = solidInfo.time.split(":")
    var split2 = split1[1].split(" ")

    $scope.editHour= split1[0]
    $scope.editMinute= split2[0]
    $scope.editTime= split2[1]

    $scope.editFood = solidInfo.type

    $scope.saveEditSolid=function(){
      $scope.Solidslist[index] = {
        date: solidInfo.date,
        time: $scope.editHour + ":" + $scope.editMinute + " " + $scope.editTime,
        type: $scope.editFood
      } 
      $scope.editView = false

       $http.post("https://childcare-data-service.herokuapp.com/child/"+ $scope.childSelection.id + "/solids",
        $scope.Solidslist)
    }
  }

  $scope.cancelEditSolid=function(){
    $scope.editView = false
  }


  /*Update solids View*/ 
  console.log($scope)
  var updateSolidsView = function(){
    $http.get("https://childcare-data-service.herokuapp.com/child/" + $scope.childSelection.id + "/solids")
      .success(function(data){
        $scope.Solidslist = data || []
      }) 
    }

  updateSolidsView()

  $scope.today = function(){
    $scope.getInfo = moment().format('MMM DD, YYYY')
  }

  $scope.yesterday = function(){
    $scope.getInfo = moment().add(-1, 'days').format('MMM DD, YYYY')
    console.log($scope.getInfo)
  }

  $scope.showAll = function(){
    $scope.getInfo = undefined
  }
  $scope.del=function(data){
    $scope.Solidslist.splice(data, 1)
    $http.post("https://childcare-data-service.herokuapp.com/child/"+ $scope.childSelection.id + "/solids",
        $scope.Solidslist).success(function() {
           console.log("HI")
        })
  }
  
  /*Add new solid*/
  $scope.saveNewSolid = function(){

    $scope.Solidslist.unshift({
      date: moment().format('MMM DD, YYYY'),
      time: $scope.hour + ":" + $scope.minute + " " + $scope.time,
      type: $scope.food
    })

    $http.post("https://childcare-data-service.herokuapp.com/child/" + $scope.childSelection.id + "/solids",
        $scope.Solidslist).success(function() {
            console.log("Hi")
        })
  }

  

})