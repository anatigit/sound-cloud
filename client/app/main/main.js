'use strict';

angular.module('anatApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        controller: 'MainController',
        controllerAs: '$ctrl',
        templateUrl: 'app/main/main.html'
      });
  });
