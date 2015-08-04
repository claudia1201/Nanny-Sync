
var app = angular.module("nannySync", [ 
  "ngRoute",
  "pageCtrl",
  "custAccCtrl", 
  "feedingCtrl",
  "solidsCtrl",
  "sleepCtrl",
  "medicationCtrl",
  "allergiesCtrl",
  "appointmentsCtrl"
])

app.config(function($routeProvider){

  $routeProvider
    .when("/landing", {
      templateUrl: "templates/landing.html"
    })
    .when("/custAcc", {
      templateUrl: "templates/custAcc.html",
      controller: "CustAccController"
    })
    .when("/feeding", {
      templateUrl: "templates/feeding.html",
      controller: "FeedingController"
    })
    .when("/solids", {
      templateUrl: "templates/solids.html",
      controller: "SolidsController"
    })
    .when("/sleep", {
      templateUrl: "templates/sleep.html",
      controller: "SleepController"
    })
    .when("/medication", {
      templateUrl: "templates/medication.html",
      controller: "MedicationController"
    })
    .when("/allergies", {
      templateUrl: "templates/allergies.html",
      controller: "AllergiesController"
    })
    .when("/appointments", {
      templateUrl: "templates/appointments.html",
      controller: "AppointmentsController"
    })
    .otherwise({
      templateUrl: "templates/landing.html"
      //controller: "PageController"
    })

})