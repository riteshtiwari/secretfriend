app.controller('homeCtrl', ['$scope','$http','$location','urls','loginService','localStorageService', function($scope,$http,$location,urls,loginService,localStorageService,$modalInstance) {
	
	$scope.toCheckDefaultLoginOnHome = function(){		
		var loginStObj = localStorageService.getObj("loginDetails");
		/*if(loginStObj.emailId != undefined && loginStObj.userId != undefined){
			$location.path('/messageSending');
		} else {			
			$location.path('/home');
		}*/
	};
	
	 $scope.toHandleNotImplemnted = function(){		 
		 alert(" Functionality not implemented!");
	 };
	 
	 $scope.CloseMenu = function(){		 
		 //alert(" Functionality not implemented!");
		 $('body').removeClass('visible-nav');
	 };
	
}]);