'use strict';

angular.module('catchaiApp.LoginController', ['ngRoute'])

.controller('LoginController', ['$scope', '$routeParams','$location','$ngBootbox','AdminDAO',

  function($scope, $routeParams,$location,$ngBootbox,AdminDAO){

	$scope.init = function(){
		console.log("LoginController.js: init();");
	};

	$scope.loginEnviar = function() {
		console.log("loginEnviar();");

		/*
		$scope.model.admin = {"idadmin":1,"nombre":"AntiCheli"};
		$scope.model.logueado = true;
		$location.path('/eventos');
		*/
		var enviar = true;
		var mensaje = "Te faltó:"
		if(!$scope.model.admin.usuario){
			enviar = false;
			mensaje +="<br/>Usuario";
		}	
		if(!$scope.model.admin.contrasena){
			enviar = false;
			mensaje +="<br/>Contraseña";
		}

		if(enviar){
			$("#loginButton").button('loading');

		  	AdminDAO.login($scope.model.admin.usuario,$scope.model.admin.contrasena).then(function(data){
		  		console.log(data);
				$("#loginButton").button('reset');

		  		if(data.result){
					$scope.model.admin = data.admin;			  		
	  				$scope.model.logueado = true;
					$location.path('/eventos');
		  		} else {
		  			console.error(data.errores);
			        $ngBootbox.alert(data.errores).then(function() { });
		  		}
		  	},function(data){
				$("#loginButton").button('reset');
		  		$ngBootbox.alert(data.errores).then(function() { });
		  	});			
		} else {
	        $ngBootbox.alert(mensaje).then(function() { });
		}


	}
  }

]);