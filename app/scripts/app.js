'use strict';

/**
 * @ngdoc overview
 * @name blognihonioApp
 * @description
 * # blognihonioApp
 *
 * Main module of the application.
 */
angular
  .module('blognihonioApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/editor/:editor', {
        templateUrl: 'views/editor.html',
        controller: 'EditorCtrl'
      })
      .when('/blogmin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
