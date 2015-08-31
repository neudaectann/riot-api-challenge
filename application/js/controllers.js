// Angular controllers here

'use strict';

var draaavoControllers = angular.module('draaavoControllers', ['firebase']);

app.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
    var ref = new Firebase("https://draaavo.firebaseio.com");
    return $firebaseAuth(ref);
  }
]);

draaavoControllers.controller('MainController', ['$scope', '$document', '$location', function($scope, $document, $location) {
	$scope.toTheTop = function() {
		$document.scrollTopAnimated(0, 700);
	};

	$scope.changeView = function(view) {
		$location.path(view);
	};
}]);

draaavoControllers.controller('AuthController', ['$scope', '$location', 'Auth', function($scope, $location, Auth) {
	$scope.email = '';
	$scope.password = '';

    $scope.login = function() {
    	Auth.$authWithPassword({
    		email: 	  $scope.email,
    		password: $scope.password
    	}).then(function(authData) {
    		console.log("logged in as: ", authData.uid);
    		$location.path('/application');
    	}).catch(function(error) {
    		console.error("auth failed: ", error);
    	});
    };

    $scope.signup = function() {
    	Auth.$createUser({
    		email:    $scope.email,
    		password: $scope.password
    	}).then(function(userData) {
    		console.log("user " + userData.uid + "created succ");
    		return $scope.login();
    	}).catch(function(error) {
    		console.error("error: ", error);
    	});
    };
}]);

draaavoControllers.controller('ApplicationController', ['$scope', function($scope) {
    $scope.summonerName = '';
    $scope.server = '';

    $scope.generateItemSet = function() {
        
    };
}]);
