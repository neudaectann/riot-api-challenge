var app = angular.module('draaavoApp', ['ngRoute', 'duScroll']);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'index.html',
			controller: 'MainController'
		})
		.when('/login', {
			templateUrl: 'login.html',
			controller: 'AuthController'
		})
		.when('/signup', {
			templateUrl: 'signup.html',
			controller: 'AuthController'
		});
}]);

app.controller('MainController', ['$scope', '$document', '$location', function($scope, $document, $location) {
	$scope.toTheTop = function() {
		$document.scrollTopAnimated(0, 700);
	};

	$scope.changeView = function(view) {
		$location.path(view);
	};
}]);

app.controller('AuthController', ['$scope', function($scope) {
	$scope.user = {
		username: '',
		password: ''
	};

	$scope.error_message = '';

	$scope.login = function() {
		$scope.error_message = 'Who want some Draaavo?';
	};

	$scope.register = function() {
		$scope.error_message = 'Got axes, need victims.';
	};
}]);

