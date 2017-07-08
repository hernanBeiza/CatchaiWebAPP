'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('catchaiApp', [
  'ngRoute',
  'constantes',
  'catchaiApp.IndexController',
  'catchaiApp.LoginController',
  'catchaiApp.EventosListaController',
  'catchaiApp.EventoAgregarController',  'catchaiApp.EventoEditarController',
  'catchaiApp.GifsListaController',
  'catchaiApp.MenuController',
  'catchaiApp.EventoModel','catchaiApp.AdminModel',
  'catchaiApp.EventoDAO','catchaiApp.AdminDAO','catchaiApp.GifDAO',
  'backButton',
  'ngBootbox','ui.bootstrap','angular-moment-module'
]);

app.config(['$routeProvider','$locationProvider',
  function($routeProvider,$locationProvider) {
  console.log("app.js: config");
  //https://stackoverflow.com/questions/42102697/weird-url-ending-with-angularjs-routing
  $locationProvider.html5Mode(false);
  $locationProvider.hashPrefix('');
  //$locationProvider.html5Mode(true).hashPrefix('!')

  $routeProvider.
  when('/login', {
    templateUrl: 'views/loginView.html',
    //controller: 'EventosListaController'
  }).
  when('/eventos', {
    templateUrl: 'views/eventosView.html',
    //controller: 'EventosListaController'
  }).
  when('/evento/agregar', {
    templateUrl: 'views/eventoAgregar.html',
    //controller: 'EventosAgregarController'
  }).
  when('/evento/editar/:idevento', {
    templateUrl: 'views/eventoEditar.html',
    //controller: 'EventosAgregarController'
  }).
  when('/gifs/:idevento', {
    templateUrl: 'views/gifsView.html',
    //controller: 'EventosAgregarController'
  }).
  when('/index', {
    templateUrl: 'views/indexView.html',
    //controller: 'IndexController'
  }).
  otherwise({redirectTo: '/index'});

}]).run(function($rootScope,ENV,$location){
  console.log("app.js: run");
  console.log(ENV);

  //Dónde guardaremos todos nuestros datos
  $rootScope.model = {};
  //Controlará si existe sesión
  $rootScope.model.logueado = false;
  //Modelo del administrador
  $rootScope.model.admin = {}
  // Total de paginas
  $rootScope.model.paginas = 0;
  //Eventos de prueba
  //$rootScope.model.eventos = [{"idevento":1,"nombre":"Paris Joven"},{"idevento":2,"nombre":"Primavera Rocker"}];
  // Gifs
  $rootScope.model.gifs = [];

  $rootScope.$on('$routeChangeSuccess', function() {
    console.log($location.path());
    if($location.path()!="/index" && $location.path()!="/login" && !$rootScope.model.admin.idadministrador){
      console.error("Usuario no logueado: ",$rootScope.model.logueado);
      $location.path("/");
    } else {
      console.log("Usuario logueado: ",$rootScope.model.logueado);
    }
  });

  $rootScope.getNumber = function(num) {
    console.log(num);
    return new Array(num);   
  }

});