'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('catchaiApp', [
  'ngRoute',
  'constantes',
  'catchaiApp.IndexController',
  'catchaiApp.LoginController',
  'catchaiApp.EventosListaController',
  'catchaiApp.EventoAgregarController',
  'catchaiApp.GifsListaController',
  'catchaiApp.MenuController',
  'backButton',
  'ngBootbox','ui.bootstrap'
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
  when('/eventoAgregar', {
    templateUrl: 'views/eventoAgregar.html',
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

}]).run(function($rootScope,ENV){

  console.log("app.js: run");
  console.log(ENV);

  //Dónde guardaremos todos nuestros datos
  $rootScope.model = {};
  //Controlará si existe sesión
  $rootScope.model.logueado = false;
  //Modelo del administrador
  $rootScope.model.admin = {}
  // Total de paginas
  $rootScope.model.paginas = 3;
  //Eventos de prueba
  $rootScope.model.eventos = [{"idevento":1,"nombre":"Paris Joven"},{"idevento":2,"nombre":"Primavera Rocker"}];
  // Gifs
  $rootScope.model.gifs = [];

  $rootScope.getNumber = function(num) {
      return new Array(num);   
  }

});