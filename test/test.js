var should = require( 'chai' ).should( ) ;
var Shelve  = require( '../shelve' ).Shelve ;

describe( 'Shelve', function ( ) {

  function obj ( ) {
    this.cb ;
    this.foo = "bar" ;
    this.getFoo = function ( ) {
      if ( this.cb !== undefined ) this.cb( this.foo ) ;
      return this.foo ;
    } ;
  } ;

  var obj   = new obj( ) ;

  describe( 'initialization', function ( ) {
    var newDefer = new Shelve( ) ;

    it ( 'should have defer function', function ( ) {
      newDefer.should.have.property( 'defer' ).be.a( 'function' ) ;
    } ) ;

    it ( 'should have deferred array of length 0', function ()  {
      newDefer.should.have.property( '_deferred' ).with.length( 0 ).be.a( 'array') ;
    }) ;

  }) ;

  describe( 'defer', function ( ) {
      var defer = new Shelve( ) ;

    it ( 'should add function to deferred array', function ( ) {
      defer.defer( obj.getFoo ) ;
      defer.should.have.property( '_deferred' ).with.length( 1 ) ;
    }) ;

  } ) ;


  describe( 'defer', function( ) {

    it ( 'should return execution to inner loop and add unexecuted event back to event queue.', function ( done ) {
      var defer = new Shelve( ) ;
      var max = 1000000 ;
      for ( var i = 0; i <= max; i++ ) {
        var fn = genFunc( i, max ) ;
        defer.defer( fn ) ;
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
