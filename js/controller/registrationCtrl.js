app.controller('registrationCtrl', ['$scope','$http','$location','urls','registrationService', function($scope,$http,$location,urls,registrationService) {
	$scope.maleAvatar = {};
	$scope.maleAvatar.images = {
	    initialImage: "img/check_selected_grey.png",
	    finalImage: "img/check_selected.png",
	    current : "img/check_selected_grey.png"
	};
	
	$scope.femaleAvatar = {};
	$scope.femaleAvatar.images = {
	    initialImage: "img/check_selected_grey.png",
	    finalImage: "img/check_selected.png",
	    current : "img/check_selected_grey.png"
	};
	
	/*To check/uncheck checkbox.*/
	$scope.toSelectAvatar = function(){
		if($scope.maleAvatar.images.current === $scope.maleAvatar.images.finalImage)
			$scope.maleAvatar.images.current = $scope.maleAvatar.images.initialImage;
        else if($scope.maleAvatar.images.current === $scope.maleAvatar.images.initialImage)
        	$scope.maleAvatar.images.current = $scope.maleAvatar.images.finalImage;
	};
	$scope.toSelectFemaleAvatar = function(){
		if($scope.femaleAvatar.images.current === $scope.femaleAvatar.images.finalImage)
			$scope.femaleAvatar.images.current = $scope.femaleAvatar.images.initialImage;
        else if($scope.femaleAvatar.images.current === $scope.femaleAvatar.images.initialImage)
        	$scope.femaleAvatar.images.current = $scope.femaleAvatar.images.finalImage;
	};
	
	/*To register new user.*/
	$scope.doSignUp = function(form){
		console.log('usermodel=',$scope.usermodel);
		/*if(form.$valid){
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

			
		}*/
	};
	
	$scope.formatDate = function(date){
		 var d = new Date(date),
	        month = '' + (d.getMonth() + 1),
	        day = '' + d.getDate(),
	        year = d.getFullYear();

	    if (month.length < 2) month = '0' + month;
	    if (day.length < 2) day = '0' + day;

	    return [year, month, day].join('-');
	};
	
}]);


