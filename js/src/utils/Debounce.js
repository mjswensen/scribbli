define([], function() {

  /* Based on Remy Sharp's work:
   * http://remysharp.com/2010/07/21/throttling-function-calls/
   */
  return function(fn, delay, context) {
    var timer = null;
    return function() {
      clearTimeout(timer);
      timer = setTimeout(function() {
        fn.apply(context);
      }, delay);
    };
  };

});
