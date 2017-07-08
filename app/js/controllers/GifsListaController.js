'use strict';

angular.module('catchaiApp.GifsListaController', ['ngRoute'])

.controller('GifsListaController', ['$scope', '$routeParams', '$location', 'GifDAO','$ngBootbox',

  function($scope, $routeParams, $location, GifDAO, $ngBootbox){

	$scope.init = function(){
		console.log("GifsListaController.js: init();");
		$scope.model.eventos = [];

		if($scope.model.evento){	
			console.log($scope.model.evento);
			$scope.gifsCargar(1);			
		}
	};

	$scope.gifsCargar = function(pagina){
		//Total de páginas
		$scope.model.cargando = true;
		$scope.model.pagina = pagina;
	  	GifDAO.obtenerConPagina(pagina,$scope.model.evento).then(function(data){
			$scope.model.cargando = false;
	  		if(data.result){
	  			$scope.model.paginas = data.paginas;
		  		$scope.model.gifs = data.imagenes;		  			
	  		} else {
	  			$scope.model.gifs = [];
	  			console.error(data.errores);
		        $ngBootbox.alert(data.errores).then(function() { });			    		
	  		}
	  	}, function(data){
			$scope.model.cargando = false;
  			$scope.model.gifs = [];
	        $ngBootbox.alert(data.errores).then(function() { });			    		
	  	});
	}

	$scope.darAlta = function(gif){
		console.log(gif);
		$scope.model.cargando = true;
		GifDAO.darAlta(gif).then(function(data){
			$scope.model.cargando = false;
			if(data.result){
				gif.valid=1;
				console.log(gif);
		        $ngBootbox.alert(data.mensajes).then(function() { });			    		
			} else {
		        $ngBootbox.alert(data.errores).then(function() { });			    		
			}
	  	},function(data){
			$scope.model.cargando = false;
	        $ngBootbox.alert(data.errores).then(function() { });			    		
	  	});
	}

	$scope.darBaja = function(gif){
		console.log(gif);
		$scope.model.cargando = true;

		GifDAO.darBaja(gif).then(function(data){
			$scope.model.cargando = false;
	
			if(data.result){
				gif.valid=2;
				console.log(gif);
		        $ngBootbox.alert(data.mensajes).then(function() { });			    		
			} else {
		        $ngBootbox.alert(data.errores).then(function() { });			    		
			}
			
	  	},function(data){
			$scope.model.cargando = false;	
	        $ngBootbox.alert(data.errores).then(function() { });			    		
	  	});
	}

	$scope.cargarAnterior = function(pagina){
		$scope.model.pagina = pagina;

	}

	$scope.cargarSiguiente = function(pagina){
		$scope.model.pagina = pagina;
	}



  }

]);