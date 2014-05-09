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
    var timer ;
    var self = { } ;

    self.triggered =  false ;
    self._deferred = [ ] ;
    self.maxTime   = 50 ;
    self.defer     = defer ;

    return self ;

    /**
     * add `fn` to deferred queue if shelve has not been triggered otherwise trigger it
     * @param {Function} fn
     * @return instance
     * @api public
     */
    function defer ( fn ) {

      if ( typeof fn === "function" ) self._deferred.push( fn ) ;

      if ( timer === undefined ) timer = next( deferredWorker ) ;

    } ;

    /**
     * Triggers all functions in deferred queue releasing from event loop when needed
     * @api public
     */

    function deferredWorker ( ) {
      timer = undefined ;
      var startMs = Date.now( ) ;

      for ( var i = 0; i < self._deferred.length; i++ ) {

        var fn      = self._deferred[ i ] ;
        var eventMs = Date.now( ) - startMs ;

        fn( ) ;

        if ( eventMs > self.maxTime ) {

          self._deferred = self._deferred.slice( i, self._deferred.length ) ;
          defer( ) ;
          return ;

        }


      }

      self._deferred = [ ] ;
    }

  }

  global.Shelve = Shelve ;

}( typeof window === "undefined" ? this : window ) ) ;
