app.service('loginService', function($http,urls,messageSendingService) {
    this.login = function(loginModel,form,cb){
    	if(form.$valid){
			var obj = loginModel.email+"~"+loginModel.password;
			var req = {
					 method: 'POST',
					 url: urls.BASE_URL_LOGIN+'/signin',
					 headers: {
					   'Content-Type': "text/plain"
					 },
					 data:obj
			};
			$http(req).then(function(response){
				if(response.data.success){
					cb({"Message":"Success","response":response.data.data});
				}else{
					console.log('error');
					cb({"Message":"Error","response":response.data.data});
					messageSendingService.toAutodisappearAlert();
				}
				
			}, function(response){
				console.log(" fail=",response);
				$("#loader").css("display","none");
				$("#messageTxt p").html("Could not connect to server, try again!");
				$('#le-alert').css("display","block");
				messageSendingService.toAutodisappearAlert();
			});

			
		}
    };
    
    this.toValidateEmail = function(mail){		
		 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))  
		  { 		  	
		    return true;
		  } 
		  return false;  
	};  
});