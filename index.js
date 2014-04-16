;( function ( global ) {
  "use strict" ;

  // Async function execution for client side and server side
  var next = (typeof process === 'undefined' || typeof process.nextTick === 'undefined' ) ? function (fn) { setTimeout(fn, 0); } : process.nextTick ;

  function Deputy ( ) {
      this.context ;
      this.deferred = [ ] ;

      return this ;
  }

  Deputy.prototype.defer = function defer ( fn ) {

    // Check if deferreds have been triggered
    if ( this.context !== undefined ) {
      next( fn.bind( this.context ) ) ;
    }

    else {
      this.deferred.push( fn ) ;
    }


  }

  Deputy.prototype.trigger = function trigger ( context ) {

    this.context = context === undefined ? this : context ;
    var context = this.context ;

    for ( var i = 0; i < this.deferred.length; i++ ) {
      var fn = this.deferred[ i ] ;
      next( fn.bind( context ) ) ;
    }

    this.deferred = [ ] ;

  }


  global.Deputy = Deputy ;

}( typeof exports === 'undefined' ? window : exports ) ) ;