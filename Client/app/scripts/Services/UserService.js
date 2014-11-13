/**
 * Created by bryan on 8/17/14.
 */
'use strict';
app.factory('UserService', ['Restangular', function (Restangular) {
	var httpUser = Restangular.all('api/users'),
		resultObj = {};

	resultObj.register = function(user) {
		return httpUser.post(user);
	};

	return resultObj;
}]);