'use strict';

angular.module('catchaiApp.EventoAgregarController', ['ngRoute'])

.controller('EventoAgregarController', ['$scope', '$routeParams','$ngBootbox','EventoDAO','EventoModel','moment',

  function($scope,$routeParams,$ngBootbox,EventoDAO,EventoModel,moment){

	$scope.init = function(){
		console.log("EventoAgregarController.js: init();");
		$scope.model.evento = {};
	};

	$scope.eventoAgregar = function(){
		console.log("eventoAgregar");
		$scope.model.evento.idadministrador = $scope.model.admin.idadministrador;

		var enviar = true;
		var errores = "Te faltó:";
		var fecha = $scope.model.evento.fecha;

		var nombre = $scope.model.evento.nombre;
		if(!$scope.model.admin.idadministrador){
			enviar = false;
			errores +="<br>Id del administrador";
		}
		if(!fecha){
			enviar = false;
			errores +="<br>Fecha";
		} else {
			var fecha = moment(fecha).format('YYYY-MM-DD');
			console.log(fecha);
		}

		if(!nombre){
			enviar = false;
			errores +="<br>Nombre";
		}
		if(enviar){
			console.log($scope.model.evento);
			$("#agregarButton").button('loading');
			var eventoModel = new EventoModel(null,$scope.model.admin.idadministrador,fecha,nombre,1);
			EventoDAO.guardar(eventoModel).then(function(data){
				console.log(data);
				$("#agregarButton").button('reset');
		  		if(data.result){
			  		$scope.model.eventos = data.eventos;
  			        $ngBootbox.alert(data.mensajes).then(function() { });			    				  			
		  		} else {
		  			console.error(data.errores);
			        $ngBootbox.alert(data.errores).then(function() { });			    		
		  		}
		  	},function(data){
	  			console.error(data.errores);	
				$("#agregarButton").button('reset');			
		        $ngBootbox.alert(data.errores).then(function() { });			    			  		
		  	});
		} else {
	        $ngBootbox.alert(errores).then(function() { });			    		
		}

	}

  }

]);