app.service('registrationService', function($http,urls) {
	console.log('registrationService');
    this.login = function(loginModel,form,cb){
    	/*if(form.$valid){
			var obj = loginModel.email+"~"+loginModel.password;
			console.log('obj=',obj);
			var req = {
					 method: 'POST',
					 url: urls.BASE_URL_LOGIN+'/signin',
					 headers: {
					   'Content-Type': "text/plain"
					 },
					 data:obj
			};
			$http(req).then(function(response){
				cb({"Message":"Success","response":response.data.data});
			}, function(){
				console.log(" fail");
			});

			
		}*/
    	if(form.$valid){
			var obj = $scope.reg_email+"~"+$scope.reg_password+"~ipad~12~true~"+$scope.formatDate(new Date())+"~"+$scope.formatDate(new Date())+"~"+"12~12~Hi there";
			console.log('obj=',obj);
			var req = {
					 method: 'POST',
					 url: urls.BASE_URL_LOGIN+'/signup',
					 headers: {
					   'Content-Type': "text/plain"
					 },
					 data:obj
			};
			$http(req).then(function(response){
				console.log(" success=",response);
				console.log(" success=",response.data.success);
				if(response.data.success){
					$location.path('/messageSending');
				}else{
					alert(response.data.data);
				}
				
			}, function(){
				console.log(" fail");
			});

			
		}
    };
});