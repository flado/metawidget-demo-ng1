var app = angular.module('app', ['ngRoute', 'metawidget'])

 .config(['$routeProvider', function($routeProvider) {
      //routing
      $routeProvider.when( '/account/:accountId', {
        templateUrl: 'account/account.html',
        controller: 'accountCtrl'
      } ).otherwise( {
        templateUrl: 'accounts/accounts.html',
        controller: 'accountsCtrl'
      });
  }]);

