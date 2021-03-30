app.controller('mainCtrl', ['$scope','$location','$window','localStorageService','messageSendingService', function($scope,$location,$window, localStorageService, messageSendingService) {
	// This is a functions that scrolls to #{blah}link
	
	$scope.toCheckDefaultLogin = function(){
		var loginStObj = localStorageService.getObj("loginDetails");
		if(loginStObj.emailId != undefined && loginStObj.userId != undefined){
			$location.path('/messageSending');
		} else {			
			$location.path('/main');
		}
	};
	
	$scope.toGetDefaultSettings = function(){
		var loginStObj = localStorageService.getObj("loginDetails");	
		
		if(loginStObj.emailId != undefined && loginStObj.userId != undefined){	
			$("#topheader-to-offset").css("display","none");
			$("#logoutHeader").css("display","block");
		} else {			
			$("#topheader-to-offset").css("display","block");
			$("#logoutHeader").css("display","none");
		}		
		
	};
	
	 
	$scope.goToByScroll = function(id){
		console.log('id ',id);
	      // Remove "link" from the ID
	    id = id.replace("link", "");
	    
	      // Scroll
	    $(".navbar").css("display","block");
	    $('html,body').animate({
	        scrollTop: $("#"+id).offset().top},
	        'slow');
	   
	};

	$("#sidebar > ul > li > a").click(function(e) { 
	      // Prevent a page reload when a link is pressed
	    e.preventDefault(); 
	      // Call the scroll function
	    goToByScroll($(this).attr("id"));           
	});
	
	//$('.hideme').hide();
	$window.onscroll = function(){
		//console.log('menu');
		if($(".navbar").offset() != undefined){
			var eleOffset = $(".navbar").offset().top;
			console.log("eleOffset=",eleOffset);
			if(eleOffset > 640) {
				$(".navbar").css("display","block");
				$("#benefits").css("display","block");
			}else{
				$(".navbar").css("display","none");
			}
		}
			
	};
	
	 /*To do logout.*/
	 $scope.doLogoutHome = function(){
		 $("#loader").css("display","block");
		 $("#loaderBg").css("display","block");
		 messageSendingService.logout(function(data){
				try{
					if(data.Message == "Success"){
						 $("#loader").css("display","none");
						 $("#loaderBg").css("display","none");

						localStorageService.removeObj("loginDetails");
						localStorageService.removeObj("settingDetails");
						$location.path('/main');
					}else{
						$("#loader").css("display","none");
						$("#loaderBg").css("display","block");
						$("#messageTxt p").html("Could not connect to server, try again!");
						$('#le-alert').css("display","block");
						$location.path('/messageSending');
					}
				}catch (e) {
					console.log("Error="+e);
				}
		 });
	 };
	 
  }]);
