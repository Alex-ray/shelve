var should = require( 'chai' ).should( ) ;
var Defer  = require( '../deferred' ).Defer ;

describe( 'Defer', function ( ) {

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
    var newDefer = new Defer( ) ;

    it ( 'should have trigger function', function ( ) {
      newDefer.should.have.property( 'trigger' ).be.a( 'function' ) ;
    } ) ;

    it ( 'should have defer function', function ( ) {
      newDefer.should.have.property( 'defer' ).be.a( 'function' ) ;
    } ) ;

    it ( 'should have deferred array of length 0', function ()  {
      newDefer.should.have.property( 'deferred' ).with.length( 0 ).be.a( 'array') ;
    }) ;

  }) ;

  describe( 'defer', function ( ) {
      var defer = new Defer( ) ;

    it ( 'should add function to deferred array', function ( ) {
      defer.defer( obj.getFoo ) ;
      defer.should.have.property( 'deferred' ).with.length( 1 ) ;
    }) ;

  } ) ;


  describe( 'trigger', function( ) {

    it ( 'should trigger deferred functions with context', function ( done ) {
      var defer = new Defer( ) ;
      obj.cb = function ( foo ) {
        foo.should.be.a( 'string' ).equal( 'bar' ) ;
        done( ) ;
      }

      defer.defer( obj.getFoo ) ;
      defer.trigger( obj ) ;
    }) ;

    it ( 'should trigger deferred in seperate context', function ( done ) {
      var defer = new Defer( ) ;
      var newContext = { } ;
      newContext.foo = 'foobar' ;

      newContext.cb = function ( foo ) {
        foo.should.be.a( 'string' ).equal( 'foobar' ) ;
        done( ) ;
      }

      defer.defer( obj.getFoo ) ;
      defer.trigger( newContext ) ;
    })

  } ) ;

} ) ;
