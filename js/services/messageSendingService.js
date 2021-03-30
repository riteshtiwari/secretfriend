app.service('messageSendingService', function($http,urls,$location) {
	console.log('messageSendingService');
//	var userToken = localStorage.getItem("userToken");
	/*To get avatar list.*/
	var me = this;
	
    this.getAvatarList = function(cb){
    	var req = {
				 method: 'POST',
				 url: urls.BASE_URL_LOGIN+'/listAvatar',
				 headers: {
				   'Content-Type': "text/plain"
				 },
		};
		$http(req).then(function(response){
			console.log(" success=",response);
			console.log(" success=",response.data.success);
			if(response.data.success){
				cb({"Message":"Success","response":response.data.data});
			}else{
				cb({"Message":"Error","response":response.data.data});
			}
			
		}, function(response){
			$("#loader").css("display","none");
			$("#messageTxt p").html("Could not connect to server, try again!");
			$('#le-alert').css("display","block");
			me.toAutodisappearAlert();
		});
    };
    
    /*To get device list.*/
    this.getAllDevices = function(emailId,cb){
    	var req = {
				 method: 'POST',
				 url: urls.BASE_URL_LOGIN+'/getAllDevices',
				 headers: {
					   'Content-Type': "text/plain"
			     },
			     data:emailId
		};
		$http(req).then(function(response){
			console.log("success=",response);
			console.log("success=",response.data.success);
			if(response.data.success){
				cb({"Message":"Success","response":response.data.data});
			}else{
				cb({"Message":"Error","response":response.data.data});
			}
			
		}, function(response){
			$("#loader").css("display","none");
			$("#messageTxt p").html("Could not connect to server, try again!");
			$('#le-alert').css("display","block");
			me.toAutodisappearAlert();
			
		});
    };
    
    /*To logout.*/
    this.logout = function(cb){
    	var req = {
				 method: 'POST',
				 url: urls.BASE_URL_LOGIN+'/logout',
				 headers: {
					   'Content-Type': "text/plain"
				  },
		};
		$http(req).then(function(response){
			console.log(" success=",response);
			console.log(" success=",response.data.success);
			if(response.data.success){
				cb({"Message":"Success","response":response.data.data});
			}else{
				cb({"Message":"Error","response":response.data.data});
			}
			
		}, function(response){
			$("#loader").css("display","none");
			$("#messageTxt p").html("Could not connect to server, try again!");
			$('#le-alert').css("display","block");
			me.toAutodisappearAlert();
		});
    };
    
    /*To update setting.*/
    this.changeDeviceGeneralSettings = function(obj,cb){
    	console.log('updateDefaultSetting=',obj);
    	var req = {
				 method: 'POST',
				 url: urls.BASE_URL_LOGIN+'/changeDeviceGeneralSettings',
				 headers: {
					   'Content-Type': "text/plain",
				 },
				 data:obj
		};
		$http(req).then(function(response){
			console.log(" success=",response);
			console.log(" success=",response.data.success);
			if(response.data.success){
				cb({"Message":"Success","response":response.data.data});
			}else{
				cb({"Message":"Error","response":response.data.data});
			}
			
		}, function(response){
			$("#loader").css("display","none");
			$("#messageTxt p").html("Could not connect to server, try again!");
			$('#le-alert').css("display","block");
			me.toAutodisappearAlert();
		});
    };
    
    /*To send message.*/
    this.toSendMessage = function(obj,cb){
    	console.log('toSendMessage=',obj);
    	var req = {
				 method: 'POST',
				 url: urls.BASE_URL_LOGIN+'/insertMsg',
				 headers: {
					   'Content-Type': "text/plain",
				 },
				 data:obj
		};
		$http(req).then(function(response){
			console.log(" success=",response);
			console.log(" success=",response.data.success);
			if(response.data.success){
				cb({"Message":"Success","response":response.data.data});
			}else{
				cb({"Message":"Error","response":response.data.data});
			}
			
		}, function(response){
			$("#loader").css("display","none");
			$("#messageTxt p").html("Could not connect to server, try again!");
			$('#le-alert').css("display","block");
			me.toAutodisappearAlert();
		});
    };
    
   this.toAutodisappearAlert = function(){
		setTimeout(function(){					
			
			 $("#le-alert").fadeTo(2000, 500).slideUp(500, function(){
				 $('#le-alert').css("display","none");
					$("#loaderBg").css("display","none");
					$("#lightBoxBg").removeClass('in');
	       });   
			
		},200);
	};
	
});