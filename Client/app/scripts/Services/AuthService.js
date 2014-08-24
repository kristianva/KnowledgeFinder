/**
 * Created by bryan on 8/23/14.
 */
'use strict';

app.factory('AuthService', ['Restangular', 'SessionService', function(Restangular, SessionService) {
	var httpLogin =  Restangular.all('login'),
		authObj = {};

	authObj.login = function(credentials) {
		return httpLogin.post(credentials).then(function (res) {
			SessionService.create(res.id, res.user.id, res.user.role);
			return res.user;
		});
	};

	authObj.isAuthenticated = function() {
		return !!SessionService.id;
	};

	return authObj;
}]);
