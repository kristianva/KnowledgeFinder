/**
 * Created by bryan on 8/19/14.
 */
'use strict';
app.controller('userCtrl', ['$scope', '$stateParams', 'UserService', function ($scope, $stateParams, UserService) {
	UserService.one($stateParams.id).get().then(function(user) {
		$scope.user = user;
	});
}]);
