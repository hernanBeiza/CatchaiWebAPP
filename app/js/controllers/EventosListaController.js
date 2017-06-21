'use strict';

angular.module('catchaiApp.EventosListaController', ['ngRoute'])

.controller('EventosListaController', ['$scope', '$routeParams','$location',

  function($scope, $routeParams, $location){

	$scope.init = function(){
		console.log("EventosListaController.js: init();");
		$scope.eventosCargar();
	};

	$scope.eventosCargar = function(){
		console.log($scope.model.eventos);
	}

	$scope.irGifs = function(evento){
		$scope.model.evento = evento;
		$location.path('/gifs/'+evento.idevento);
	}

	$scope.irEditar = function(evento){

	}

	$scope.eventoEliminar = function(evento){

	}

  }

]);