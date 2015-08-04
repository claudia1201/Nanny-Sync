
angular.module("feedingCtrl", [])
.controller("FeedingController", function($scope, $http){ 
  $scope.nameTitle = $scope.childSelection.name+ ":"
  $scope.infoView= false
  /*Update feeding View*/
  var updateFeedingView = function(){
    $http.get("https://childcare-data-service.herokuapp.com/child/"+ $scope.childSelection.id + "/feeding")
      .success(function(data){
        $scope.Feedinglist = data || []
      })
    }

  updateFeedingView()

  $scope.today = function(){
    $scope.getInfo = moment().format('MMM DD, YYYY')
  }

  $scope.yesterday = function(){
    $scope.getInfo = moment().add(-1, 'days').format('MMM DD, YYYY')
  }

  $scope.showAll = function(){
    $scope.getInfo = undefined
  }
  $scope.del=function(data){
    console.log(data)
    console.log($scope.Feedinglist)
    $scope.Feedinglist.splice(data, 1)
    $http.post("https://childcare-data-service.herokuapp.com/child/"+ $scope.childSelection.id + "/feeding",
        $scope.Feedinglist).success(function() {
           console.log("HI")
        })
  }
  $scope.edit = function(index, feedingInfo){
    console.log(index, feedingInfo)
    $scope.editView = true
    var time = feedingInfo.time
    var split1 = time.split(":")
    var split2 = split1[1].split(" ")
    var split3 = feedingInfo.amount.split("oz")
    $scope.editHour = split1[0]
    $scope.editMinute = split2[0]
    $scope.editTime = split2[1]
    $scope.editAmount = split3[0]

    $scope.saveEditFeeding=function(){
      $scope.Feedinglist[index] = {
        date: feedingInfo.date,
        time: $scope.editHour + ":" + $scope.editMinute + " " + $scope.editTime,
        amount: $scope.editAmount + "oz"
      } 
      $scope.editView = false

       $http.post("https://childcare-data-service.herokuapp.com/child/"+ $scope.childSelection.id + "/feeding",
        $scope.Feedinglist)
    }
  }

  $scope.cancelEditFeeding=function(){
    $scope.editView = false
  }

  /*Add new feeding*/

  $scope.saveNewFeeding = function(){

    $scope.Feedinglist.unshift({
      date: moment().format('MMM DD, YYYY'),
      time: $scope.hour + ":" + $scope.minute + " " + $scope.time,
      amount: $scope.amount + "oz"
    })

    $http.post("https://childcare-data-service.herokuapp.com/child/"+ $scope.childSelection.id + "/feeding",
        $scope.Feedinglist).success(function() {
            $scope.hour = ""
            $scope.minute = ""
            $scope.time = ""
            $scope.amount = ""
        })
  }

})