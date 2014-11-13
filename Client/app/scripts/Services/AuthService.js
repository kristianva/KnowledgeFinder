/**
 * Created by bryan on 8/23/14.
 */
'use strict';

app.factory('AuthService', ['Restangular', 'SessionService', function(Restangular, SessionService) {
	var httpLogin =  Restangular.all('login'),
		httpLogout =  Restangular.all('logout'),
		resultObj = {};

	resultObj.login = function(credentials) {
		return httpLogin.post(credentials).then(function (res) {
			SessionService.create(res.id, res.user.id, res.user.role);
			return res.user;
		});
	};

	resultObj.isAuthenticated = function() {
		return !!SessionService.id;
	};

	resultObj.logout = function () {
		return httpLogout.post(SessionService).then(function () {
			SessionService.destroy();
			return null;
		});
	};

	return resultObj;
}]);
