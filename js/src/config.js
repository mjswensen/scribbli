define([], function() {

	/* Returns a function that loads
	 * a configuration option from localstorage
	 * or a default if not exists. If the returned
	 * function is given an argument, it acts as a setter
	 * for said value before returning it.
	 */
	function configHandler(key, defaultValue) {
		return function(newValue) {
			if(newValue === undefined) {
				return localStorage.getItem(key) === null ? defaultValue : JSON.parse(localStorage.getItem(key));
			} else {
				localStorage.setItem(key, JSON.stringify(newValue));
				return newValue;
			}
		};
	}

  return {
    editableMinWidth: 90,
    editableMinHeight: 30,
    resizeHandleSize: 20,
    user: {
      collapseShortcuts: configHandler('collapseShortcuts', true)
    }
  };
});
