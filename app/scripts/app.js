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
    'ngRoute'
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
