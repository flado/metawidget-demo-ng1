
var app = angular.module('app', ['ngRoute', 'metawidget'])

  /*.config(['$routeProvider', function($routeProvider) {
      //routing configuration
      $routeProvider.when( '/contact-detail/:contactId', {
        templateUrl: 'contact-detail/contact-detail.html',
        controller: 'contactDetailCtrl'
      } ).when( '', {
        templateUrl: 'home/home.html',
        controller: 'homeCtrl'
      } ).otherwise( {
        templateUrl: 'home/home.html',
        controller: 'homeCtrl'
      });
  }]);
*/


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

