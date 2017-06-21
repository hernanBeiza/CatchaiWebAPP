'use strict';

angular.module('catchaiApp.EventoAgregarController', ['ngRoute'])

.controller('EventoAgregarController', ['$scope', '$routeParams','$ngBootbox',

  function($scope, $routeParams,$ngBootbox){

	$scope.init = function(){
		console.log("EventoAgregarController.js: init();");
		$scope.model.evento = {};
	};

	$scope.eventoAgregar = function(){
		console.log("eventoAgregar");
		console.log($scope.model.evento);
		var enviar = true;
		var errores = "Te faltó:";
		var nombre = $scope.model.evento.nombre;
		if(!nombre){
			enviar = false;
			errores +="<br>Nombre";
		}

		if(enviar){
			$("#agregarButton").button('loading');
			var ultimo = $scope.model.eventos.length+1;
			$scope.model.evento.idevento = ultimo;
			$scope.model.eventos.push($scope.model.evento);
	        $ngBootbox.alert("Evento creado correctamente").then(function() { });			    		
			$scope.model.evento = null;
			$("#agregarButton").button('reset');			
		} else {
	        $ngBootbox.alert(errores).then(function() { });			    		
		}

	}

  }

]);