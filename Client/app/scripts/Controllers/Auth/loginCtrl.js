/**
 * Created by bryan on 8/23/14.
 */
'use strict';
app.controller('loginCtrl', ['$scope', '$state', 'AuthService', function ($scope, $state, AuthService) {
	$scope.credentials = {
		username: 'Bryan',
		password: '123'
	};

	$scope.login = function (credentials) {
		AuthService.login(credentials).then(function(res) {
			$scope.setCurrentUser(res);
			$state.go('home');
		}, function() {
			console.log('failed');
		});
	};
}]);
