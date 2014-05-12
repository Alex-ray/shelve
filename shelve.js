;( function ( global ) {
  "use strict" ;

  // Async function execution for client side and server side
  var next ;

  if ( typeof process === 'undefined' || typeof process.nextTick === 'undefined' ) {
    next = function (fn) { return setTimeout(fn, 0); }  ;
  }

  else {
    next = process.nextTick ;
  }

  function Shelve ( ) {
    var fTimer ;
    var self = { } ;

    var fDeferred = [ ] ;
    var fMaxTime  = 50 ;

    self.defer = defer ;

    return self ;

    /**
     * add `fn` to deferred queue if shelve has not been triggered otherwise trigger it
     * @param {Function} fn
     * @return instance
     * @api public
     */
    function defer ( fn ) {

      if ( typeof fn !== "function" ) return false;

      fDeferred.push( fn ) ;
      _schedual( ) ;

      return true ;

    } ;

    /**
     * Triggers all functions in deferred queue releasing from event loop when needed
     * @api public
     */
    function _deferredWorker ( ) {
      fTimer = undefined ;
      var endMs = Date.now( ) + fMaxTime;

      for ( var i = 0; i < fDeferred.length; i++ ) {
        fDeferred[ i ]( ) ;

        if ( Date.now( ) >= endMs ) {

          fDeferred = fDeferred.slice( i, fDeferred.length ) ;
          _schedual( ) ;
          return ;

        }


      }

      fDeferred = [ ] ;
    }

    // PRIVATE
    function _schedual ( ) {
      if ( fTimer === undefined ) fTimer = next( _deferredWorker ) ;
    }

  }

  global.Shelve = Shelve ;

}( typeof window === "undefined" ? this : window ) ) ;
