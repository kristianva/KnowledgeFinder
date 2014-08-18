'use strict';

var app = angular.module('client', ['restangular', 'ui.bootstrap', 'ui.router', 'ngMockE2E']);

app.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'partials/main.html',
			controller: 'MainCtrl'
		})
		.state('categories', {
			url: '/categories',
			templateUrl: 'partials/categories/list.html',
			controller: 'categoryCtrl'
		})
		.state('users', {
			url: '/users',
			templateUrl: 'partials/users/list.html',
			controller: 'userCtrl'
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

	$httpBackend.whenPOST('/api/categories').respond(function (method, url, data, headers) {
		console.log('Received these data:', method, url, data, headers);
		categories.push(angular.fromJson(data));
		return [200, {}, {}];
	});

	$httpBackend.whenGET('/api/categories').respond(function (method, url, data) {
		console.log("Getting categories");
		return [200, categories, {}];
	});

	var users = [
		{
			id: 0,
			photo: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/t1.0-1/p320x320/1972535_10203555904727736_322150056554051292_n.jpg',
			username: 'bryancr89',
			firstName: 'Bryan',
			lastName: 'Azofeifa',
			numberCategories: 10
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

	$httpBackend.whenGET('/api/users').respond(function (method, url, data) {
		console.log("Getting users");
		return [200, users, {}];
	});

	$httpBackend.whenGET(/^partials\/.*/).passThrough();
});