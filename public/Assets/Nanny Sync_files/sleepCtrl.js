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