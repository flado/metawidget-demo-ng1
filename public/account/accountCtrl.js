app.controller('accountCtrl', ['$scope', '$routeParams', '$location', 'accounts', 'mwConfig' , function($scope, $routeParams, $location, accounts, mwConfig) {

  $scope.mwConfig = mwConfig;

  switch ( $routeParams.accountId ) {
    case 'savings':
    case 'credit':
      $scope.readOnly = false;
      //default account values on account creation
      $scope.current = {
        created: new Date(),
        balance: 0.0,
        customer: {
          id: 1,
          address: {
          }
        }
      };
      //account type from id value
      $scope.current.type = $routeParams.accountId;
      if ( $scope.current.type === 'savings' ) {
        $scope.title = 'New Savings Account';
      } else {
        $scope.title = 'New Credit Account';
      }
      break;
    default: //having a proper id (an existing account -> can update customer details only)
      $scope.readOnly = true;
      accounts.then( function( result ) {
        var accountId = parseInt( $routeParams.accountId );
        for ( var i = 0; i < result.data.length; i++ ) {
          if ( result.data[i].id === accountId ) {
            // Return a copy of the entry, in case the user hits cancel
            $scope.current = angular.fromJson( angular.toJson( result.data[i] ) );
            $scope.title = 'Account Number: ' + accountId + ' ';
            if ( $scope.current.type === 'savings' ) {
              $scope.title += '( Savings )';
            } else {
              $scope.title += '( Credit )';
            }
            break;
          }
        }
      } );
  }

  // CRUD operations

  $scope.crudActions = {

    delete: function() {
      accounts.then( function( result ) {
        // Update existing
        for ( var i = 0; i < result.data.length; i++ ) {
          if ( result.data[i].id === $scope.current.id ) {
            result.data[i].closed = new Date();
            break;
          }
        }
      });
      //go home
      $location.path( '' );
    },

    edit: function() {
      $scope.readOnly = false;
    },

    save: function() {

      if ( !$scope.current.customer.firstname) {
        alert( 'Firstname is required' );
        return;
      }

      if ( !$scope.current.customer.lastname ) {
        alert( 'Lastname is required' );
        return;
      }

      if ( !$scope.current.customer.dob ) {
        alert( 'Date Of Birth is required' );
        return;
      }

      if ( !$scope.current.customer.address.street) {
        alert( 'Street is required' );
        return;
      }

      if ( !$scope.current.customer.address.city ) {
        alert( 'City is required' );
        return;
      }

      if ( !$scope.current.customer.address.postcode) {
        alert( 'Postcode is required' );
        return;
      }

      accounts.then( function( result ) {
        var loop, length;
        if ( $scope.current.id === undefined ) {
          // Save new
          var nextId = 0;
          for ( loop = 0, length = result.data.length; loop < length; loop++ ) {
            if ( result.data[loop].id > nextId ) {
              nextId = result.data[loop].id;
            }
          }
          $scope.current.id = nextId + 1;
          result.data.push( $scope.current );
        } else {
          // Update existing
          for ( loop = 0, length = result.data.length; loop < length; loop++ ) {
            if ( result.data[loop].id === $scope.current.id ) {
              result.data.splice( loop, 1, $scope.current );
              break;
            }
          }
        }
        $location.path( '' );
      } );
    },

    cancel: function() {
      $location.path( '' );
    }
  };

}]);