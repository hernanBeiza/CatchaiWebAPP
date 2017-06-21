'use strict';

angular.module('catchaiApp.IndexController', ['ngRoute'])

.controller('IndexController', ['$scope', '$routeParams',

  function($scope, $routeParams){

	$scope.init = function(){
		console.log("IndexController.js: init();");
	};

  }

]);