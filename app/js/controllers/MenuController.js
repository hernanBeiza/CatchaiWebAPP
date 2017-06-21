'use strict';

angular.module('catchaiApp.MenuController', ['ngRoute'])

.controller('MenuController', ['$scope', '$routeParams',
  
  function($scope, $routeParams){

	$scope.init = function(){
		console.log("MenuController.js: init();");
	};

  }

])
