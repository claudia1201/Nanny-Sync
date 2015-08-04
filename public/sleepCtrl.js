angular.module("sleepCtrl", [])
.controller("SleepController", function($scope, $http){
  $scope.nameTitle = $scope.childSelection.name + ":"
  /*Update sleep View*/
  console.log($scope) 
  var updateSleepView = function(){
    $http.get("https://childcare-data-service.herokuapp.com/child/" + $scope.childSelection.id + "/sleep")
      .success(function(data){
        $scope.Sleeplist = data || []
        console.log($scope.Sleeplist)
      })
    }

  updateSleepView()
  
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
    $scope.Sleeplist.splice(data, 1)
    $http.post("https://childcare-data-service.herokuapp.com/child/"+ $scope.childSelection.id + "/sleep",
        $scope.Sleeplist).success(function() {
           console.log("HI")
        })
  }

  $scope.edit = function(index, napInfo){
    $scope.editView = true

    var split1 = napInfo.start.split(":")
    var split2 = split1[1].split(" ")

    $scope.editstartHour = split1[0]
    $scope.editStartMinute = split2[0]
    $scope.editStartTime = split2[1]

    var split3 = napInfo.end.split(":")
    var split4 = split3[1].split(" ")

    $scope.editHour = split3[0]
    $scope.editMinute = split4[0]
    $scope.editTime = split4[1]

    $scope.saveEditSleep=function(){
      $scope.Sleeplist[index] = {
        date: napInfo.date,
        start: $scope.editstartHour + ":" + $scope.editStartMinute + " " + $scope.editStartTime,
        end: $scope.editHour + ":" + $scope.editMinute + " " + $scope.editTime
      } 
      $scope.editView = false

       $http.post("https://childcare-data-service.herokuapp.com/child/"+ $scope.childSelection.id + "/sleep",
        $scope.Sleeplist)
    }
  }

  $scope.cancelEditSleep=function(){
    $scope.editView = false
  }
 
  /*Add new nap*/
  $scope.saveNewNap = function(){

    $scope.Sleeplist.unshift({
      date: moment().format('MMM DD, YYYY'),
      start: $scope.startHour + ":" + $scope.startMinute + " " + $scope.startTime,
      end: $scope.hour + ":" + $scope.minute + " " + $scope.time
    })

    $http.post("https://childcare-data-service.herokuapp.com/child/" + $scope.childSelection.id + "/sleep",
        $scope.Sleeplist).success(function() {
            $scope.startHour
            $scope.startMinute
            $scope.startTime
            $scope.hour
            $scope.minute
        })
  } 

})