'use strict';

angular.module('catchaiApp.GifsListaController', ['ngRoute'])

.controller('GifsListaController', ['$scope', '$routeParams','$location',

  function($scope, $routeParams, $location){

	$scope.init = function(){
		console.log("GifsListaController.js: init();");
		console.log($scope.model.evento);

		$scope.gifsCargar(1);
	};

	$scope.gifsCargar = function(pagina){
		//Total de páginas
		$scope.model.gifs = [{idgif:1,bajada:"Acá con los amigos",valid:1},{idgif:2,bajada:"¡Vacilando!",valid:1},{idgif:3,bajada:"¡Estamos ultraah!",valid:2}]
		console.log($scope.model.gifs);
	}

	$scope.darAlta = function(gif){
		console.log(gif);
		gif.valid=1;
		console.log(gif);
	}

	$scope.darBaja = function(gif){
		console.log(gif);
		gif.valid=2;
		console.log(gif);
	}


  }

]);