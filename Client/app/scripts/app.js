'use strict';

var app = angular.module('client', ['restangular', 'ui.bootstrap', 'ui.router', 'ngMockE2E']);

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
			resolve: {
				loggedin: checkLoggedOut
			}
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

app.run(function ($rootScope, $state, $httpBackend) {
	$rootScope.appName = 'Knowledge Finder';
	$rootScope.$state = $state;
	$rootScope.search = '';

	var categories = [
		{
			id: 0,
			title: 'Web development',
			description: 'All the technologies related to build web apps y'
		},
		{
			id: 1,
			title: 'Databases y',
			description: 'All the technologies related to data bases'
		}
	];
	var users = [
		{
			id: 0,
			photo: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/t1.0-1/p320x320/1972535_10203555904727736_322150056554051292_n.jpg',
			username: 'bryancr89',
			firstName: 'Bryan',
			lastName: 'Azofeifa',
			numberCategories: 10,
			categories: [
				{
					name: 'Javascript',
					lvl: 10
				},
				{
					name: 'Html',
					lvl: 7
				},
				{
					name: 'CSS',
					lvl: 8
				}
			]
		},
		{
			id: 1,
			photo: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/t1.0-1/p320x320/1972535_10203555904727736_322150056554051292_n.jpg',
			username: 'test',
			firstName: 'Test',
			lastName: 'A',
			numberCategories: 15
		}
	];


	$httpBackend.whenPOST('/api/categories').respond(function (method, url, data, headers) {
		console.log('Received these data:', method, url, data, headers);
		categories.push(angular.fromJson(data));
		return [200, {}, {}];
	});

	$httpBackend.whenGET('/api/categories').respond(function (method, url, data) {
		console.log("Getting categories");
		return [200, categories, {}];
	});

	$httpBackend.whenGET(/\/api\/users$/).respond(function (method, url, data) {
		console.log("Getting users");
		return [200, users, {}];
	});

	var x = true;

	$httpBackend.whenGET('/loggedin').respond(function (method, url, data) {
		x = !x;
		return [200, x, {}];
	});

	$httpBackend.whenGET(/^\/api\/users\/[\d]+/).respond(function (method, url, data) {
		return [200, users[url.match(/[\d]+/)[0]], {}];
	});

	$httpBackend.whenGET(/^partials\/.*/).passThrough();


	$httpBackend.whenPOST('/login').respond(function (method, url, data) {
		return [200, {id: 1, user: {id: 1, role: 'admin'}}, {}];
	});
});