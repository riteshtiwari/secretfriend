angular.module('SecretFriend')
    .constant('urls',
    {
        BASE_URL_LOGIN: 'http://192.168.1.33:8080/SecretFriendWS/rest/sf'
    	//BASE_URL_LOGIN : 'http://192.168.1.59:8080/SecretFriendWS/rest/sf'
		//BASE_URL_LOGIN : 'http://ec2-54-243-39-214.compute-1.amazonaws.com:8080/SecretFriendWS/rest/sf' 	// Biz4AWS Server URL
    	//BASE_URL_LOGIN : 'http://ec2-52-27-60-75.us-west-2.compute.amazonaws.com:8080/SecretFriendWS/rest/sf'	// Client AWS Server URL
    }
);
