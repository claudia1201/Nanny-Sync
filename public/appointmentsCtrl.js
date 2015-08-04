angular.module("appointmentsCtrl", [])
.controller("AppointmentsController", function($scope, $http){
  $scope.nameTitle = $scope.childSelection.name + ":"
  $scope.del=function(data){
    $scope.Appointmentslist.splice(data, 1)
    $http.post("https://childcare-data-service.herokuapp.com/child/"+ $scope.childSelection.id + "/appointments",
        $scope.Appointmentslist).success(function() {
           console.log("HI")
        })
  }

  $scope.edit = function(index, appointmentInfo){
    $scope.editView = true
    $scope.editName = appointmentInfo.name
    
    var split1 = appointmentInfo.date.split("/")
    console.log(split1[0], "and", split1[1], "and", split1[2] )

    if(split1[0] === "1"){
      split1[0] = "January (1)"
    }
    if(split1[0] === "2"){
      split1[0] = "February (2)"
    }
    if(split1[0] === "3"){
      split1[0] = "March (3)"
    }
    if(split1[0] === "4"){
      split1[0] = "April (4)"
    }
    if(split1[0] === "5"){
      split1[0] = "May (5)"
    }
    if(split1[0] === "6"){
      split1[0] = "June (6)"
    }
    if(split1[0] === "7"){
      split1[0] = "July (7)"
    }
    if(split1[0]=== "8"){
      split1[0] = "August (8)"
    }
    if(split1[0] === "9"){
      split1[0] = "September (9)"
    }
    if(split1[0] === "10"){
      split1[0] = "September (9)"
    }
    if(split1[0]=== "11"){
      split1[0] = "November (11)"
    }
    if(split1[0] === "12"){
      split1[0] = "December (12)"
    }

    $scope.editMonth=split1[0]
    $scope.editDay=split1[1]
    $scope.editYear=split1[2]

    var split2 = appointmentInfo.time.split(":")
    var split3 = split2[1].split(" ")
    $scope.editHour = split2[0]
    $scope.editMinute = split3[0]
    $scope.editTime = split3[1]

    $scope.saveEditAppointment=function(){

      if($scope.editMonth === "January (1)"){
      $scope.editMonth = 1
    }
    if($scope.editMonth === "February (2)"){
      $scope.editMonth = 2
    }
    if($scope.editMonth === "March (3)"){
      $scope.editMonth = 3
    }
    if($scope.editMonth === "April (4)"){
      $scope.editMonth = 4
    }
    if($scope.editMonth === "May (5)"){
      $scope.editMonth = 5
    }
    if($scope.editMonth === "June (6)"){
      $scope.editMonth = 6
    }
    if($scope.editMonth === "July (7)"){
      $scope.editMonth = 7
    }
    if($scope.editMonth === "August (8)"){
      $scope.editMonth = 8
    }
    if($scope.editMonth === "September (9)"){
      $scope.editMonth = 9
    }
    if($scope.editMonth === "October (10)"){
      $scope.editMonth = 10
    }
    if($scope.editMonth === "November (11)"){
      $scope.editMonth = 11
    }
    if($scope.editMonth === "December (12)"){
      $scope.editMonth = 12
    }

      $scope.Appointmentslist[index] = {
        name: $scope.editName,
        date: $scope.editMonth + "/" + $scope.editDay + "/" + $scope.editYear,
        time: $scope.editHour + ":" + $scope.editMinute + " " + $scope.editTime
      } 
      $scope.editView = false

       $http.post("https://childcare-data-service.herokuapp.com/child/"+ $scope.childSelection.id + "/appointments",
        $scope.Appointmentslist)
    }
  }

  $scope.cancelEditAppointment=function(){
    $scope.editView = false
  }


  /*Update appointments View*/
  var updateAppointmentsView = function(){
    $http.get("https://childcare-data-service.herokuapp.com/child/" + $scope.childSelection.id + "/appointments")
      .success(function(data){
        $scope.Appointmentslist = data || []
      }) 
    }

  updateAppointmentsView() 

  /*Add new solid*/
  $scope.saveNewAppointment = function(){
    if($scope.month === "January (1)"){
      $scope.month = 1
    }
    if($scope.month === "February (2)"){
      $scope.month = 2
    }
    if($scope.month === "March (3)"){
      $scope.month = 3
    }
    if($scope.month === "April (4)"){
      $scope.month = 4
    }
    if($scope.month === "May (5)"){
      $scope.month = 5
    }
    if($scope.month === "June (6)"){
      $scope.month = 6
    }
    if($scope.month === "July (7)"){
      $scope.month = 7
    }
    if($scope.month === "August (8)"){
      $scope.month = 8
    }
    if($scope.month === "September (9)"){
      $scope.month = 9
    }
    if($scope.month === "October (10)"){
      $scope.month = 10
    }
    if($scope.month === "November (11)"){
      $scope.month = 11
    }if($scope.month === "December (12)"){
      $scope.month = 12
    }
    $scope.Appointmentslist.push({
      name: $scope.name,
      date: $scope.month + "/" + $scope.day + "/" + $scope.year,
      time: $scope.hour + ":" + $scope.minute + " " + $scope.time
    })

    $http.post("https://childcare-data-service.herokuapp.com/child/" + $scope.childSelection.id + "/appointments",
        $scope.Appointmentslist).success(function() {
            $scope.name = ""
            $scope.month = ""
            $scope.day = ""
            $scope.year = ""
            $scope.hour = ""
            $scope.minute = ""
            $scope.time = ""
        })
  }
})
