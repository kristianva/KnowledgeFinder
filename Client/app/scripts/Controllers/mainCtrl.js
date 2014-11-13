'use strict';

app.controller('MainCtrl', ['$scope', '$state', 'AuthService', function ($scope, $state, AuthService) {
	$scope.currentUser = null;
//	$scope.userRoles = USER_ROLES;
	$scope.isAuthenticated = AuthService.isAuthenticated;

	$scope.logout = function () {
		AuthService.logout().then(function () {
			$state.go('home');
		}, function () {
			console.log('fail');
		});
	};

	$scope.setCurrentUser = function (user) {
		$scope.currentUser = user;
	};
}]);
