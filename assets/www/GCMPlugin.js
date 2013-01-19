(function () {

	var GCM = function() {};

	/**
	 * Register device with GCM service
	 * @param senderId - GCM service identifier
	 * @param eventCallback - {String} - Name of global window function that will handle incoming events from GCM
	 * @param successCallback - {Function} - called on success on registering device
	 * @param failureCallback - {Function} - called on failure on registering device
	 */
	GCM.prototype.register = function(senderID, eventCallback, successCallback, failureCallback) {

	  if ( typeof eventCallback != "string") {   // The eventCallback has to be a STRING name not the actual routine like success/fail routines
	    var e = new Array();
	    e.msg = 'eventCallback must be a STRING name of the routine';
	    e.rc = -1;
	    failureCallback( e );
	    return;
	  }

	  return Cordova.exec(successCallback,      //Callback which will be called when directory listing is successful
	              failureCallback,       //Callback which will be called when directory listing encounters an error
	              'GCMPlugin',        //Telling Cordova that we want to run "DirectoryListing" Plugin
	              'register',             //Telling the plugin, which action we want to perform
	              [{ senderID: senderID, ecb : eventCallback }]);          //Passing a list of arguments to the plugin,
	                          // The ecb variable is the STRING name of your javascript routine to be used for callbacks
	                          // You can add more to validate that eventCallback is a string and not an object
	};


	/**
	 * Un-Register device with GCM service
	 * @param successCallback - {Function} - called on success on un-registering device
	 * @param failureCallback - {Function} - called on failure on un-registering device
	 */
	GCM.prototype.unregister = function( successCallback, failureCallback ) {

	    return cordova.exec(successCallback,      //Callback which will be called when directory listing is successful
	              failureCallback,       //Callback which will be called when directory listing encounters an error
	              'GCMPlugin',        //Telling Cordova that we want to run "DirectoryListing" Plugin
	              'unregister',             //Telling the plugin, which action we want to perform
	              [{ }]);          //Passing a list of arguments to the plugin,
	};


	/*
	 * register plugin with Phonegap \ Cordova
	 */
	if (cordova.addPlugin) {
	  cordova.addConstructor(function() {
	    //Register the javascript plugin with Cordova
	    cordova.addPlugin('GCM', new GCM());
	  });
	} else {
		if (!window.plugins) {
			window.plugins = {};
		}
	  window.plugins.GCM = new GCM();
	}

	
})();

