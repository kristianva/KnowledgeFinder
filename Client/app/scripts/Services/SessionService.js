/**
 * Created by bryan on 8/23/14.
 */
'use strict';

app.factory('SessionService', function() {
	var sessionObj = {};

	sessionObj.create = function(sessionId, userId, userRole) {
		this.id = sessionId;
		this.userId = userId;
		this.userRole = userRole;
	};

	sessionObj.destroy = function() {
		this.id = null;
		this.userId = null;
		this.userRole = null;
	};

	return sessionObj;
});
