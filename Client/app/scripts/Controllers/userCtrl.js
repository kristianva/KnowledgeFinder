/**
 * Created by bryan on 8/16/14.
 */
'use strict';

app.controller('userCtrl', ['$scope', '$stateParams', 'UserService', function ($scope, $stateParams, UserService) {
	UserService.getList().then(function(users) {
		$scope.users = users;
	});

	$scope.user = $stateParams.id;
}]);