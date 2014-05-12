var should = require( 'chai' ).should( ) ;
var Shelve  = require( '../shelve' ).Shelve ;

describe( 'Shelve', function ( ) {

  describe( 'initialization', function ( ) {
    var newDefer = new Shelve( ) ;

    it ( 'should have defer function', function ( ) {
      newDefer.should.have.property( 'defer' ).be.a( 'function' ) ;
    } ) ;

  }) ;

  describe( 'defer', function( ) {

    it ( 'should return execution to inner loop and add unexecuted event back to event queue.', function ( done ) {
      var deferred = new Shelve( ) ;
      var max = 1000000 ;
      for ( var i = 0; i <= max; i++ ) {
        var fn = genFunc( i, max ) ;
        deferred.defer( fn ) ;
      }

      function genFunc ( num, max ) {
        return function ( ) {

          if ( num === max ) done( ) ;
          return num ;
        } ;
      }
    }) ;

  } ) ;

} ) ;
