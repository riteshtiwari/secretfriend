 app.controller('messageSendingCtrl', ['$scope','$http','urls','$location','messageSendingService','localStorageService', function($scope,$http,urls,$location,messageSendingService,localStorageService) {
	 var selectedDevice,selectedAvatar,defaultDeviceObj,defaultAvatarObj;
	 /*To get default settings.*/
	 $scope.toGetDefaultSettings = function(){
		 $("#loader").css("display", "block");
		 var loginStObj = localStorageService.getObj("loginDetails");
		 var deviceStObj = localStorageService.getObj("settingDetails");
		 var loader = false;
		 if(loginStObj.emailId != undefined && loginStObj.userId != undefined){
				 setTimeout(function(){
					 /*To set default devicename*/
					 angular.forEach($scope.deviceList, function (deviceSetting, index) {
						    if (deviceSetting != undefined && deviceSetting.id != undefined) {
						    	if(deviceSetting.id == deviceStObj.id && deviceSetting.isdefaultdevice){				    		
						    		$("#"+deviceSetting.id).attr("src","img/device_Selected.png");
						    		$("#deviceNameText").html(deviceStObj.deviceName);
						    		defaultDeviceObj = deviceSetting;
						    	}else{
						    		$("#"+deviceSetting.id).attr("src","img/device_Unselected.png");
						    	}
						    }
					  });
					 /*To set default avatarImg*/
					 angular.forEach($scope.avatarList, function (avatarSetting, index) {
						    if (avatarSetting != undefined && avatarSetting.id != undefined) {
						    	if(avatarSetting.id == deviceStObj.defaultavatarid){
						    		
						    		$("#avr_"+avatarSetting.id).css({"border":"5px solid #2EA82D","border-radius":"10px"});
						    		var avatarImageArr = ["avatar1.png","avatar2.png","avatar3.png","avatar4.png","avatar5.png","avatar6.png","avatar7.png"];
						    		if(deviceStObj.defaultavatarid != undefined){
						    			$("#avatarID").attr("src","img/avatarimage/"+avatarImageArr[deviceStObj.defaultavatarid - 1]);
						    		
						    			/*To display voice options according to image*/
						    			
						    			if(deviceStObj.defaultVoice == null){
						    				
						    				if(avatarSetting.avatargender == "M"){
						    					$scope.toSelectVoice($("#maleVoice"));
						    				} else {
						    					$scope.toSelectVoice($("#femaleVoice"));
						    				}
						    				
						    			} else if(deviceStObj.defaultVoice == "usenglishmale") {
						    				
						    				$scope.toSelectVoice($("#maleVoice"));								    		
						    			} else {
						    				
						    				$scope.toSelectVoice($("#femaleVoice"));
						    			}
						    			
						    			$("#maleVoice").show();
						    			$("#femaleVoice").show();
						    			$("#avatarName").html(avatarSetting.avatarName);
						    			defaultAvatarObj = avatarSetting;
						    		}
						    	}else{
						    		$("#avr_"+avatarSetting.id).css("border","none");
						    	}
						    }
					  });
					  $("#ttsText").val(deviceStObj.defaultmessage);
					 
					  
				 },2000);
				 
				
		 } else {		  	
		  	$location.path('/home');
		 }
	 };
	
	 
	 /*To get avatar image list.*/
	 $scope.getAvatarList = function(){
		 $("#loader").css("display","block");
		 $("#loaderBg").css("display","block");
		 messageSendingService.getAvatarList(function(data){
				try{
					if(data.Message == "Success"){						
						$scope.avatarList = data.response;
					}else{						
						$scope.isAvatarAvailable = false;
						$scope.emptyAvatarList = data.response;
					}
					
					$("#loader").css("display","none");
					$("#loaderBg").css("display","none");
					
				}catch (e) {
					console.log("Error="+e);
					$("#loader").css("display","none");
					$("#loaderBg").css("display","none");
					$("#messageTxt p").html("Could not connect to server, try again!");
					$('#le-alert').css("display","block");					
					messageSendingService.toAutodisappearAlert();
				}
		 });
	 };
	 
	 /**To get all devices list.*/
	 $scope.getAllDeviceList = function(){
		 $("#loader").css("display","block");
		 $("#loaderBg").css("display","block");
		 var emailId =  localStorageService.getObj('loginDetails').emailId;
		 messageSendingService.getAllDevices(emailId,function(data){
				try{
					if(data.Message == "Success"){						
						$("#loader").css("display","none");
						$("#loaderBg").css("display","none");
						$scope.deviceList = data.response;
					}else{
						$("#loader").css("display","none");
						$("#loaderBg").css("display","none");
						$scope.isDeviceAvailable = false;
						$scope.emptyDeviceList = data.response;
					}
				}catch (e) {					
					$("#loader").css("display","none");
					$("#loaderBg").css("display","none");
					$("#messageTxt p").html("Could not connect to server, try again!");
					$('#le-alert').css("display","block");
					messageSendingService.toAutodisappearAlert();
				}
		 });
		 
	 };
	 
	 /*To get selected device.*/
	 $scope.getSelectedDevice = function(device){		
		 selectedDevice = device;
	 };
	 
	 $scope.getSelectedAvatar = function(avatar){		
		 selectedAvatar = avatar;
	 };
	 
	 /*To select device from list.*/
		$scope.toSelectDevice = function(obj){
			var imageSrc = $("#"+obj.id).attr("src");
			angular.forEach($scope.deviceList, function (deviceSetting, index) {
			    if (deviceSetting != undefined && deviceSetting.id != undefined) {		
			    	//&& imageSrc == "img/device_Unselected.png"	    	
			    	if(deviceSetting.id == obj.id){			    		
			    		$("#"+deviceSetting.id).attr("src","img/device_Selected.png");
			    		$("#deviceNameText").html(deviceSetting.deviceName);			    		
					}else{						
						$("#"+deviceSetting.id).attr("src","img/device_Unselected.png");						
					}
			    }
			});
		};
	 
	 /*To set avatar Image on click of avatar.*/
	 $scope.toSelectAvatarImg = function(obj){		
		 angular.forEach($scope.avatarList, function (avatarSetting, index) {
			    if (avatarSetting != undefined && avatarSetting.id != undefined) {		
			    	
			    	
			    	if(avatarSetting.id == obj.id){
				    	
			    		
			    		$("#avr_"+avatarSetting.id).css({"border":"5px solid #2EA82D","border-radius":"10px"});
			    		$scope.avatarImgURL = obj.avatarimageurl;
			    		/**Changes By 1010 Date:Oct 1,2015.**/
			    		/*To display voice optios according to image*/			    		
			    		/*
			    		if(obj.avatargender == "M"){			    			
			    			$scope.toSelectVoice($("#maleVoice"));
			    		}else{			    			
			    			$scope.toSelectVoice($("#femaleVoice"));
			    			//$("#avr_"+avatarSetting.id).css("border","none");
			    		}*/
			    		
			    		$("#maleVoice").show();
		    			$("#femaleVoice").show();
		    			//$scope.toSelectVoice($("#femaleVoice"));
			    		$("#avatarName").html(avatarSetting.avatarName);
			    		defaultAvatarObj = obj;
			    	
			    	}else{
			    		$("#avr_"+avatarSetting.id).css("border","none");
			    	}
			    }
		  });
		
	 };
	 
	 /*To select voice.*/
		$scope.toSelectVoice = function(ele){
			
			localStorage.setItem("selectedVoice",ele[0].name);
			$("#voiceSelected").html(ele[0].alt);
			localStorage.setItem("selected_Voice",ele[0].alt);
			if(ele[0].id == "maleVoice"){
				$("#maleVoice").css("border","5px solid rgb(46, 168, 45)");
				$("#maleVoice").css("border-radius","10px");
				$("#femaleVoice").css("border","none");
				
		}else{
				$("#femaleVoice").css("border","5px solid rgb(46, 168, 45)");
				$("#femaleVoice").css("border-radius","10px");
				$("#maleVoice").css("border","none");
				
		}
			ele.css({"border":"5px solid #2EA82D","border-radius":"10px"});
			
		};
	 
	 /*To update settings.*/
	 $scope.toUpdateSetting = function(){
		 
		 $("#loader").css("display","block");
		 $("#loaderBg").css("display","block");
		 
		 var emailId = localStorageService.getObj("loginDetails").emailId;
		 var old_udid = localStorageService.getObj("settingDetails").udid;
		 
		 //var obj = emailId+"~1234def112aa3~"+selectedDevice.deviceName+"~"+selectedAvatar.id+"~"+$("#ttsText").val();
		 if($("#ttsText").val() != undefined && $("#ttsText").val() != ""){
		 
			 voice = localStorage.getItem("selectedVoice"); 
			 var obj = emailId+"~"+old_udid+"~"+defaultDeviceObj.udid+"~"+defaultDeviceObj.deviceName+"~"+defaultAvatarObj.id+"~"+$("#ttsText").val()+"~"+voice;
			
			 messageSendingService.changeDeviceGeneralSettings(obj,function(data){
					try{
						
						if(data.Message == "Success"){
							$("#loader").css("display","none");
							$("#loaderBg").css("display","block");
							
							$("#messageTxt p").html("Device settings updated Successfully !");
							$('#le-alert').css("display","block");
							localStorageService.setObj("settingDetails",data.response);
							$location.path('/messageSending');
							messageSendingService.toAutodisappearAlert();
						}else{
							$("#loader").css("display","none");
							$("#loaderBg").css("display","block");
							
							$("#messageTxt p").html("Could not connect to server, try again!");
							$('#le-alert').css("display","block");
							$location.path('/messageSending');
							messageSendingService.toAutodisappearAlert();
						}
					}catch (e) {
						console.log("Error="+e);
					}
			 });
		 } else {
			$("#messageTxt p").html("Enter message !");
			$("#loaderBg").css("display","block");
			$('#le-alert').css("display","block");
		}
	 };
	 /*To do logout.*/
	 $scope.doLogout = function(){
		 $("#loader").css("display","block");
		 $("#loaderBg").css("display","block");
		 messageSendingService.logout(function(data){
				try{
					if(data.Message == "Success"){
						 $("#loader").css("display","none");
						 $("#loaderBg").css("display","none");

						localStorageService.removeObj("loginDetails");
						localStorageService.removeObj("settingDetails");
						$('body').css('scroll','yes');
						$('body').css('overflow','auto');
						$location.path('/home');
					}else{
						$("#loader").css("display","none");
						$("#loaderBg").css("display","block");
						$("#messageTxt p").html("Could not connect to server, try again!");
						$('#le-alert').css("display","block");
						$location.path('/messageSending');
						messageSendingService.toAutodisappearAlert();
					}
				}catch (e) {
					console.log("Error="+e);
				}
		 });
	 };
	 
	 /*I-speech integration.**/
	 $scope.init = function() {		
		 var voice = localStorage.getItem("selectedVoice");		
		 
		 
		audioPlayer = document.getElementById('audioPlayer');
		tts = new iSpeechTTS(audioPlayer, {
			apiKey: 'developerdemokeydeveloperdemokey',
			voice: voice,
			onEnded: function() {
				console.log("TTS playback ended=",localStorage.getItem("avatar_image_url"));
			}
		});
		
	};
	
	/*To play audio.*/
	$scope.playText = function() {
		console.log("play=",defaultAvatarObj);	
		if(document.getElementById('ttsText').value != null && document.getElementById('ttsText').value != ""){
			$("#loader").css("display","block");
			$("#loaderBg").css("display","block");
			
			 var voice = localStorage.getItem("selectedVoice");		
			 
			
			audioPlayer = document.getElementById('audioPlayer');
			tts = new iSpeechTTS(audioPlayer, {
				apiKey: 'developerdemokeydeveloperdemokey',
				voice: voice,
				onEnded: function() {
					console.log("TTS playback ended=",localStorage.getItem("avatar_image_url"));
				}
			});
			
			tts.speak(document.getElementById('ttsText').value);		
			$("#loader").css("display","block");
			
		}else{
			$("#messageTxt p").html("Enter message !");
			$("#loaderBg").css("display","block");
			$('#le-alert').css("display","block");
			messageSendingService.toAutodisappearAlert();
		}
		
	};
	/*To apply animation to image while playing text.*/
	var vid = document.getElementById("audioPlayer");
	vid.onplaying = function() {	    
	    $("#loader").css("display","none");
		$("#loaderBg").css("display","none");
	   
    	/*	To set gif image while playing text messages.*/
		var gifImageArr = ["face1gif.gif","face2gif.gif","face3gif.gif","face4gif.gif","face5gif.gif","face6gif.gif","face7gif.gif"];
		var avatar_image_id = defaultAvatarObj.id;//localStorage.getItem("avatar_image_id");
		console.log(" avatar_image_idL ", avatar_image_id);
		if(avatar_image_id != undefined){
			//$scope.avatarImgURL = "img/gifimage/"+gifImageArr[avatar_image_id-1];
			//$("#avatarID").attr("src","img/gifimage/"+gifImageArr[avatar_image_id-1]);
			$("#avatarID").addClass("faceGif_"+avatar_image_id);
			$("#accordianWrapper").css("pointer-events","none");
		}
		localStorage.setItem("textBoxVal",document.getElementById('ttsText').value);
	};
	/*To stop animation when audio stop playing.*/
	vid.onended = function() {		
		 $("#loader").css("display","none");
		 $("#loaderBg").css("display","none");
		
		var avatarImageArr = ["avatar1.png","avatar2.png","avatar3.png","avatar4.png","avatar5.png","avatar6.png","avatar7.png"];
		var avatar_image_id = defaultAvatarObj.id;
		if(avatar_image_id != undefined){
			//$scope.avatarImgURL = "img/avatarimage/"+avatarImageArr[avatar_image_id-1];
			$("#avatarID").removeClass("faceGif_"+avatar_image_id);
			$("#avatarID").attr("src","img/avatarimage/"+avatarImageArr[avatar_image_id-1]);
			$("#accordianWrapper").css("pointer-events","auto");
		}
	};
	
	
	/*To send message.*/
	$scope.toSendMessage = function(){
		 $("#loader").css("display","block");
		 $("#loaderBg").css("display","block");
		//selectedDevice,selectedAvatar
		 var deviceId = "";
		 alert("defaultDeviceObj : " + defaultDeviceObj);
		 if(defaultDeviceObj != null && defaultDeviceObj != "null" && defaultDeviceObj != 'undefined') {
			 deviceId = defaultDeviceObj.udid;
		 }
		 		
		var imgs = document.getElementsByName("activeDevice");
	    for (var i = 0; i < imgs.length; i++) {
	    	if(imgs[i].src.includes("device_Selected")) {
	    		deviceId = imgs[i].id;
	    	}
	    }
		var avatar_image_id = defaultAvatarObj.id;//localStorage.getItem("avatar_image_id");
		var parentId = localStorageService.getObj("loginDetails").userId;		
		var voice = localStorage.getItem("selectedVoice");
		
		if($("#ttsText").val() != undefined && $("#ttsText").val() != ""){
			
	
				var obj = parentId+"~"+deviceId+"~"+$("#ttsText").val()+"~"+voice+"~"+avatar_image_id+"~"+$scope.formatDate(new Date());
				
				
				messageSendingService.toSendMessage(obj,function(data){
					try{
						if(data.Message == "Success"){
							$("#loader").css("display","none");
							$("#loaderBg").css("display","block");
							$("#messageTxt p").html(data.response);
							$('#le-alert').css("display","block");
							//$("#sendBtn").addClass("greenBtnActive");
							$location.path('/messageSending');
							messageSendingService.toAutodisappearAlert();
						}
						else{
							$("#loader").css("display","none");
							$("#loaderBg").css("display","block");
							$("#messageTxt p").html(data.response);
							$('#le-alert').css("display","block");
							//$("#sendBtn").removeClass("greenBtnActive");
							messageSendingService.toAutodisappearAlert();
						}
					}catch (e) {
						console.log("Error="+e);
						$("#loader").css("display","none");
						$("#loaderBg").css("display","block");
						$("#messageTxt p").html("Could not connect to server, try again!");
						$('#le-alert').css("display","block");
						//$("#sendBtn").removeClass("greenBtnActive");
						messageSendingService.toAutodisappearAlert();
					}
			    });
		} else {			
			
				$("#messageTxt p").html("Enter message !");
				$("#loaderBg").css("display","block");
				$('#le-alert').css("display","block");				
				messageSendingService.toAutodisappearAlert();
		}
		
		
	};
	
	/*To format date*/
	$scope.formatDate = function(date){
		 var d = new Date(date),
	        month = '' + (d.getMonth() + 1),
	        day = '' + d.getDate(),
	        year = d.getFullYear(),
		    seconds = d.getSeconds(),
		    minutes = d.getMinutes(),
		    hour = d.getHours();
		 
	    if (month.length < 2) month = '0' + month;
	    if (day.length < 2) day = '0' + day;
	    console.log('date=',[year, month, day].join('-')+":"+hour+":"+minutes+":"+seconds);

	    //return [year, month, day].join('-');
	    return [year, month, day].join('-')+" "+hour+":"+minutes+":"+seconds;
	};
	
	
	
	/*To show default setting.*/
	$scope.toShowDefaultSetting = function(){
		/*$scope.toSelectDevice(localStorageService.getObj("selectedDeviceObj"));
		$scope.setAvatarImg(localStorageService.getObj("selectedAvatarObj"));
		$scope.selectedVoice = localStorage.getItem("selected_Voice");
		setTimeout(function(){
			$("#ttsText").val(localStorage.getItem("textBoxVal"));
		},100);*/
		
	};
	
	 /*To close alert.*/;	
	$scope.toCloseAlert = function(ele){
		$('#le-alert').css("display","none");
		$("#loaderBg").css("display","none");
		$("#lightBoxBg").removeClass('in');
	};
	
	 /*On select of voice.*/;	/**Added By 1010 Date:Oct 1,2015.*/
		$scope.onVoiceClick = function(id){
			
		if(id == "maleVoice"){
				$("#maleVoice").css("border","5px solid rgb(46, 168, 45)");
				$("#maleVoice").css("border-radius","10px");
				$("#femaleVoice").css("border","none");
				$scope.toSelectVoice($("#maleVoice"));
		}else{
				$("#femaleVoice").css("border","5px solid rgb(46, 168, 45)");
				$("#femaleVoice").css("border-radius","10px");
				$("#maleVoice").css("border","none");
				$scope.toSelectVoice($("#femaleVoice"));
		}
		};
	// For Height 
	$(function(){
	    var windowH = $(window).height() -50 ;
	    var wrapperH = $('.mainContainerN').height();
	    if(windowH > wrapperH) {                            
	        $('.mainContainerN').css({'min-height':($(window).height()-50)+'px'});
	    }                                                                               
	    $(window).resize(function(){
	        var windowH = $(window).height();
	        var wrapperH = $('.mainContainerN').height();
	        var differenceH = windowH - wrapperH;
	        var newH = wrapperH + differenceH;
	        var truecontentH = $('#truecontent').height();
	        if(windowH > truecontentH) {
	            $('.mainContainerN').css('min-height', (newH)+'px');
	        }

	    });  
	    
	});
	
}]);
 