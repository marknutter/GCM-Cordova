gApp = [];

gApp.deviceready = false;
gApp.gcmregid = '';

window.onbeforeunload  =  function(e) {

    if ( gApp.gcmregid.length > 0 )
    {
      // The same routines are called for success/fail on unregister. You can make them unique if you like
      window.GCM.unregister( GCM_Success, GCM_Fail );      // close the GCM

    }
};


document.addEventListener('deviceready', function() {
  // This is the Cordova deviceready event. Once this is called Cordova is available to be used
  $("#app-status-ul").append('<li>deviceready event received</li>' );

  $("#app-status-ul").append('<li>calling GCMRegistrar.register, register our Sender ID with Google</li>' );


  gApp.DeviceReady = true;

  // Some unique stuff here:
<<<<<<< HEAD
  // The first parameter is your Google senderID, which authorizes you to use GCM with
  // the Event Processing routine (the 2nd param). We pass in the senderID as a string,
  // not a pointer, to the routine. Under the covers, a JavaScript call is made so the name is used
  // to generate the function name to call. I didn't know how to call a JavaScript routine from Java.
  // The last two params are callback routines used by Cordova if the call succeeds or fails, respectively.
=======
  //
  // CHANGE: your_sender_id
  // TO: whatever your GCM authorized senderID is
  //
  window.plugins.GCM.register("your_sender_id", "GCM_Event", GCM_Success, GCM_Fail );

}, false );


function
GCM_Event(e)
{

  $("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');


  switch( e.event )
  {
  case 'registered':
<<<<<<< HEAD
    // The e variable points to the JSON returned as defined in GCMIntentService.java
    // In this case, I have EVENT and REGID defined on registered.
=======
    gApp.gcmregid = e.regid;
    if ( gApp.gcmregid.length > 0 )
    {
      $("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");


      // ==============================================================================
      // ==============================================================================
      // ==============================================================================
      //
      // This is where you would code to send the REGID to your server for this device
      //
      // ==============================================================================
      // ==============================================================================
      // ==============================================================================

    }

    break;

  case 'message':
    // The e variable points to the JSON returned as defined in GCMIntentService.java
    // In this case, I have EVENT, MSG and MSGCNT defined on message.

    // You will NOT receive any messages unless you build a HOST server application to send
    // messages to you. This is just here to show you how it might work.

    $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.message + '</li>');

    $("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.msgcnt + '</li>');


    break;


  case 'error':

    $("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');

    break;



  default:
    $("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');

    break;
  }
}

function
GCM_Success(e)
{
  $("#app-status-ul").append('<li>GCM_Success -> We have successfully registered and called the GCM plugin, waiting for GCM_Event:registered -> REGID back from Google</li>');

}

function
GCM_Fail(e)
{
  $("#app-status-ul").append('<li>GCM_Fail -> GCM plugin failed to register</li>');

  $("#app-status-ul").append('<li>GCM_Fail -> ' + e.msg + '</li>');

}

