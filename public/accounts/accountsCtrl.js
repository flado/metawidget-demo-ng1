app.controller('accountsCtrl', ['$scope', '$location', 'accounts', 'mwConfig', function($scope, $location, accounts, mwConfig) {

    // Load all accounts
    accounts.then(function( result ) {
      $scope.accounts = result.data;
    });

    $scope.mwConfig = mwConfig;

    $scope.createSavingsAccount = function() {
      $location.path( '/account/savings' );
    }

    $scope.createCreditAccount = function() {
      $location.path( '/account/credit' );
    }

  }]);
