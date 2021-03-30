app.controller('loginCtrl', ['$scope','$http','$location','urls','loginService','localStorageService', function($scope,$http,$location,urls,loginService,localStorageService,$modalInstance) {
	
	$scope.toCheckDefaultLogin = function(){
		var loginStObj = localStorageService.getObj("loginDetails");
		if(loginStObj.emailId != undefined && loginStObj.userId != undefined){
			$location.path('/messageSending');
		} else {			
			$location.path('/login');
		}
	};
	
	$scope.doLogin = function(form){
		loginService.login($scope.loginModel,form, function(data){
			$("#loader").css("display","block");
			$("#loaderBg").css("display","block");
			try{
				if(data.Message == "Success"){
					$("#loader").css("display","none");
					$("#loaderBg").css("display","none");
					
					
					/**Changes By 1010 Date:Oct 1,2015.*/
					if($('.modal-backdrop')[1]){
						//$('.modal-backdrop')[1].style.position="relative";
						if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) //IF IE > 10
					    {					     
					      $('.modal-backdrop')[1].style.position="relative";
					    }  
					    else 
					    {					    	
					    	$('.modal-backdrop')[1].remove();
					    }
						
					}
					
					localStorageService.setObj('loginDetails', data.response[0]);
					localStorageService.setObj('settingDetails', data.response[1]);
					$location.path('/messageSending');
					
				}
				else{
					
					$("#loader").css("display","none");
					$("#loaderBg").css("display","block");
					$("#messageTxt p").html(data.response);
					$('#le-alert').css("display","block");
				}
			}catch (e) {
				console.log("Error="+e);
				$("#loader").css("display","none");
				$("#loaderBg").css("display","block");
				$("#messageTxt p").html("Could not connect to server, try again!");
				$('#le-alert').css("display","block");
			}
		});
	};
	
	/*To close alert.*/;
	$scope.toCloseAlert = function(ele){
		$('#le-alert').css("display","none");
		$("#lightBoxBg").removeClass('in');
		$("#loaderBg").css("display","none");
	};
	 $scope.ok = function () {
	       $modalInstance.close();
	     };
	     
	     $scope.cancel = function () {
	       $modalInstance.dismiss('cancel');
	     };
}]);