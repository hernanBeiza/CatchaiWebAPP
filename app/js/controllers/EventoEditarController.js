'use strict';

angular.module('catchaiApp.EventoEditarController', ['ngRoute'])

.controller('EventoEditarController', ['$scope', '$routeParams','$ngBootbox','EventoDAO','EventoModel','moment',

  function($scope,$routeParams,$ngBootbox,EventoDAO,EventoModel,moment){

	$scope.init = function(){
		console.log("EventoEditarController.js: init();");
		if($scope.model.evento){
			console.log($scope.model.evento);
			$scope.model.evento.fecha = new Date($scope.model.evento.fecha);			
		}
	};

	$scope.eventoEditar = function(){
		console.log("eventoEditar");
		$scope.model.evento.idadministrador = $scope.model.admin.idadministrador;

		var enviar = true;
		var errores = "Te faltó:";

		var idevento = $scope.model.evento.idevento;
		var idadministrador = $scope.model.evento.idadministrador;
		var fecha = $scope.model.evento.fecha;
		var nombre = $scope.model.evento.nombre;
		var valid = $scope.model.evento.valid;

		if(!idevento){
			enviar = false;
			errores +="<br>Id del evento";
		}
		if(!idadministrador){
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
		if(!valid){
			enviar = false;
			errores +="<br>Valid";
		}
		if(enviar){
			console.log($scope.model.evento);
			$("#editarButton").button('loading');
			var eventoModel = new EventoModel(idevento,idadministrador,fecha,nombre,valid);
			EventoDAO.editar(eventoModel).then(function(data){
				console.log(data);
				$("#editarButton").button('reset');
		  		if(data.result){
			  		$scope.model.eventos = data.eventos;
  			        $ngBootbox.alert(data.mensajes).then(function() { });			    				  			
		  		} else {
		  			console.error(data.errores);
			        $ngBootbox.alert(data.errores).then(function() { });			    		
		  		}
		  	},function(data){
	  			console.error(data.errores);	
				$("#editarButton").button('reset');			
		        $ngBootbox.alert(data.errores).then(function() { });			    			  		
		  	});
		} else {
	        $ngBootbox.alert(errores).then(function() { });			    		
		}

	}

  }

]);