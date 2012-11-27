var GCM = function() { }

GCM.prototype.register = function(senderID, eventCallback, successCallback, failureCallback) {

  // The eventCallback has to be a STRING name not the actual routine like success/fail routines
  if (typeof eventCallback != "string") {
    var e = new Array();
    e.msg = 'eventCallback must be a STRING name of the routine';
    e.rc = -1;
    failureCallback( e );
    return;
  }

  var arguments = [{ senderID: senderID, ecb : eventCallback }];
  /*Lastly a list of arguments to the plugin:
  * The ecb variable is the STRING name of your javascript routine to be used for callbacks
  * You can add more to validate that eventCallback is a string and not an object
  */

  return Cordova.exec(successCallback, failureCallback, 'GCMPlugin', 'register', arguments);
  /*GCMPlugin: Telling Cordova that we want to run "DirectoryListing" Plugin
  * register: Telling the plugin, which action we want to perform
  */
};


GCM.prototype.unregister = function(successCallback, failureCallback) {
  return cordova.exec(successCallback, failureCallback, 'GCMPlugin', 'unregister', [{ }]);
};

// Register the javascript plugin with Cordova
if (cordova.addPlugin) cordova.addConstructor(function() {
  cordova.addPlugin('GCM', new GCM());
});
else window.GCM = new GCM();