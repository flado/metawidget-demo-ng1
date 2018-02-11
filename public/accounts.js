//simulate database call
app.factory( 'accounts', function( $http ) {
  return $http.get( '../data/accounts.json' );
});
