'use strict';

app.controller('MainCtrl', ['$scope', 'AuthService', function ($scope, AuthService) {
	$scope.currentUser = null;
//	$scope.userRoles = USER_ROLES;
	$scope.isAuthenticated = AuthService.isAuthenticated;

	$scope.setCurrentUser = function (user) {
		$scope.currentUser = user;
	};
}]);
