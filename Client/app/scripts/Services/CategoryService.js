/**
 * Created by bryan on 8/17/14.
 */
'use strict';
app.factory('CategoryService', ['Restangular', function (Restangular) {
	return Restangular.all('api/categories');
}]);