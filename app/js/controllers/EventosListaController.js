'use strict';

angular.module('catchaiApp.EventosListaController', ['ngRoute'])

.controller('EventosListaController', ['$scope', '$routeParams','$location','EventoDAO','$ngBootbox',

  function($scope, $routeParams, $location, EventoDAO,$ngBootbox){

	$scope.init = function(){
		console.log("EventosListaController.js: init();");
		$scope.eventosCargar(1);
	};

	$scope.eventosCargar = function(pagina){
		$scope.model.eventos = [];
		$scope.model.actualPagina = pagina;
		$scope.model.cargando = true;
	  	EventoDAO.obtenerConPagina(pagina,$scope.model.admin.idadministrador).then(function(data){
			$scope.model.cargando = false;
	  		if(data.result){
		  		$scope.model.eventos = data.eventos;	
		  		$scope.model.totalPaginas = data.paginas;	  			
	  		} else {
	  			console.error(data.errores);
		        $ngBootbox.alert(data.errores).then(function() { });			    		
	  		}
	  	}, function(data) {
			$scope.model.cargando = false;	
  	        $ngBootbox.alert(data.errores).then(function() { });			    		
	  	});
	}

	$scope.irGifs = function(evento){
		console.log(evento);
		$scope.model.evento = evento;
		$location.path('/gifs/'+evento.idevento);
	}

	$scope.irEditar = function(evento){
		$scope.model.evento = evento;
		$location.path('/evento/editar/'+evento.idevento);
	}

	$scope.eventoEliminar = function(evento){
		console.log(evento);
		$scope.model.cargando = true;	
	  	EventoDAO.eliminar(evento.idevento).then(function(data){
			$scope.model.cargando = false;
	  		if(data.result){
		        $ngBootbox.alert(data.mensajes).then(function() { 
		        	$scope.eventosCargar($scope.model.actualPagina);
		        });			    			  			  			
	  		} else {
	  			console.error(data.errores);
		        $ngBootbox.alert(data.errores).then(function() { });			    		
	  		}
	  	}, function(data) {
			$scope.model.cargando = false;
  	        $ngBootbox.alert(data.errores).then(function() { });			    		
	  	});
	}

	$scope.eventosNext = function(){
		if($scope.model.actualPagina<$scope.model.totalPaginas){
			$scope.model.actualPagina++;
			$scope.eventosCargar($scope.model.actualPagina);
		}
	}

	$scope.eventosPrev = function(){
		if($scope.model.actualPagina>1){
			$scope.model.actualPagina--;
			$scope.eventosCargar($scope.model.actualPagina);
		}
	}

	$scope.getNumber = function(num) {
    	return new Array(num);   
	}


  }

]);