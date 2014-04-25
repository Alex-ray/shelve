;( function ( global ) {
  "use strict" ;

  // Async function execution for client side and server side
  var next ;
  if ( typeof process === 'undefined' || typeof process.nextTick === 'undefined' ) {
    next = function (fn) { setTimeout(fn, 0); }  ;
  }

  else {
    next = process.nextTick ;
  }

  function Shelve ( ) {
      this.context ;
      this.deferred  = [ ] ;
      this.eventTime = 1000 ;

      return this ;
  }

  Shelve.prototype.defer = function defer ( fn ) {

    // Check if deferreds have been triggered
    if ( this.context !== undefined ) {
      next( fn.bind( this.context ) ) ;
    }

    else {
      this.deferred.push( fn ) ;
    }


  }

  Shelve.prototype.trigger = function trigger ( context ) {
    var self      = this ;
    var emit      = genEmit( self ) ;
    console.log( this ) ;
    self.context = context === undefined ? self : context ;
    next( emit ) ;

    function genEmit ( self ) {
      return function ( ) {
        // to milliseconds
        var start = Date.now( ) ;

        for ( var i = 0; i < self.deferred.length; i++ ) {

          var time = Date.now( ) - start;
          // If we have reached max time in the async event loop
          // return to main event loop and add callbacks not triggered
          // to async queue for later execution
          console.log( time ) ;
          if ( time >= self.eventTime ) {
            console.log( 'max reached') ;
            console.log( self ) ;
            self.context = undefined ;
            self.deferred.splice( 0, i ) ;
            next( self.trigger.bind( self.context )  ) ;
            return ;
          }

          var fn = self.deferred[ i ] ;
          fn.call( self.context ) ;
        }

        self.deferred = [ ] ;

      }
    } ;
  }


  global.Shelve = Shelve ;

}( typeof exports === 'undefined' ? window : exports ) ) ;
