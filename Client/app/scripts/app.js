'use strict';

var app = angular.module('client', ['restangular', 'ui.bootstrap', 'ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {
	var checkLoggedin = function($q, $timeout, $http, $location) {
		var deferred = $q.defer();

		$http.get('/loggedin').success(function(user) {
			if (user) $timeout(deferred.resolve);

			else {
				$timeout(deferred.reject);
				$location.url('/auth/login');
			}
		});

		return deferred.promise;
	};

	var checkLoggedOut = function($q, $timeout, $http, $location) {
		// Initialize a new promise
		var deferred = $q.defer();

		// Make an AJAX call to check if the user is logged in
		$http.get('/loggedin').success(function(user) {
			// Authenticated
			if (user) {
				$timeout(deferred.reject);
				$location.url('/login');
			}

			// Not Authenticated
			else $timeout(deferred.resolve);
		});

		return deferred.promise;
	};

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'partials/home.html',
			controller: 'MainCtrl'
		})

		.state('auth', {
			url: '/auth',
			templateUrl: 'partials/auth/index.html'
		})
		.state('auth.login', {
			url: '/login',
			templateUrl: 'partials/auth/login.html',
			controller: 'loginCtrl',
			resolve: {
				loggedin: checkLoggedOut
			}
		})
		.state('auth.register', {
			url: '/register',
			templateUrl: 'partials/auth/register.html',
			controller: 'signupCtrl'
		})
		.state('forgot-password', {
			url: '/forgot-password',
			templateUrl: 'partials/auth/forgot-password.html',
			resolve: {
				loggedin: checkLoggedOut
			}
		})
		.state('reset-password', {
			url: '/reset/:tokenId',
			templateUrl: 'partials/auth/reset-password.html',
			resolve: {
				loggedin: checkLoggedOut
			}
		})

		.state('categories', {
			url: '/categories',
			templateUrl: 'partials/categories/list.html',
			controller: 'categoryCtrl',
			resolve: {
				loggedin: checkLoggedin
			}
		})
		.state('users', {
			url: '/users',
			templateUrl: 'partials/users/list.html',
			controller: 'userListCtrl'
		})
		.state('users.user', {
			url: '/:id',
			templateUrl: 'partials/users/user.html',
			controller: 'userCtrl'
		});

	$urlRouterProvider.otherwise('/');
});

app.run(function ($rootScope, $state) {
	$rootScope.appName = 'Knowledge Finder';
	$rootScope.$state = $state;
	$rootScope.search = '';
});