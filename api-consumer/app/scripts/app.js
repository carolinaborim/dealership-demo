'use strict';

/**
 * @ngdoc overview
 * @name fuseTestApp
 * @description
 * # fuseTestApp
 *
 * Main module of the application.
 */
angular
  .module('fuseTestApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'uiGmapgoogle-maps'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/equipment/:id', {
        templateUrl: 'views/equipment.html',
        controller: 'EquipmentCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
  
