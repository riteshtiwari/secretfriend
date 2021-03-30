/*  Main angular App */
var app = angular.module('SecretFriend', [
   'ngRoute'
]);

/* Configure the Routes */
app.config(function($routeProvider) {
	  /* Routes for home page */
	  $routeProvider
      .when('/home', {
          templateUrl: 'views/home.html',
          //controller: 'mainCtrl'
          controller: 'homeCtrl'
      })
      .when('/login', {
          templateUrl: 'views/login.html',
          controller: 'loginCtrl'
      })
      .when('/main', {
          templateUrl: 'views/main.html',
          controller: 'mainCtrl'
      })
      .when('/registration', {
          templateUrl: 'views/registration.html',
          controller: 'registrationCtrl'
      })
      .when('/messageSending', {
          templateUrl: 'views/messageSending.html',
          controller: 'messageSendingCtrl'
      })
      .otherwise({
          redirectTo: '/home'
      });
});


/* Controls for pages */
app.controller('mainCtrl', function($scope) {
    $scope.students = [
        {name: 'Mark Waugh', city:'New York'},
        {name: 'Steve Jonathan', city:'London'},
        {name: 'John Marcus', city:'Paris'}
    ];
 
    $scope.message = "Click on the hyper link to view the students list.";
});