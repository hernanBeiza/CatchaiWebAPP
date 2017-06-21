'use strict';

angular.module('catchaiApp.LoginController', ['ngRoute'])

.controller('LoginController', ['$scope', '$routeParams','$location',

  function($scope, $routeParams,$location){

	$scope.init = function(){
		console.log("LoginController.js: init();");
	};

	$scope.loginEnviar = function() {
		console.log("loginEnviar();");
		$scope.model.admin = {"idadmin":1,"nombre":"AntiCheli"};
		$scope.model.logueado = true;
		$location.path('/eventos');

	}
  }

]);