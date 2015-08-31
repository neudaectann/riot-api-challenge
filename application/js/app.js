'use strict';

var app = angular.module('draaavoApp', ['duScroll', 'sticky', 'ngRoute', 'draaavoControllers']);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'main-page.html',
			controller: 'MainController'
		})
		.when('/login', {
			templateUrl: 'signin.html',
			controller: 'AuthController'
		})
		.when('/application', {
			templateUrl: 'application.html',
			controller: 'ApplicationController'
		})
		.when('/signup', {
			templateUrl: 'signup.html',
			controller: 'AuthController'
		});
}]);