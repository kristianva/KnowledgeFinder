/**
 * Created by bryan on 10/12/14.
 */
'use strict';

app.controller('signupCtrl', ['$scope', 'UserService', function ($scope, UserService) {
	$scope.user = {
		name: '',
		email: '',
		username: '',
		password: ''
	};
	
	$scope.register = function (user) {
		UserService.register(user);
	};
}]);