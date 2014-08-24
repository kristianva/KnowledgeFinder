/**
 * Created by bryan on 8/16/14.
 */
'use strict';

app.controller('userListCtrl', ['$scope', '$stateParams', 'UserService', function ($scope, $stateParams, UserService) {
	UserService.getList().then(function(users) {
		$scope.users = users;
	});
}]);