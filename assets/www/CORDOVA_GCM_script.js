//alert( localStorage.site );
gApp = new Array();

gApp.deviceready = false;
gApp.gcmregid = '';

window.onbeforeunload  =  function(e) {

    if ( gApp.gcmregid.length > 0 )
    {
      // The same routines are called for success/fail on the unregister. You can make them unique if you like
      window.GCM.unregister( GCM_Success, GCM_Fail );      // close the GCM

    }
};


document.addEventListener('deviceready', function() {
  // This is the Cordova deviceready event. Once this is called Cordova is available to be used
  alert('deviceready event received' );

  alert('calling GCMRegistrar.register, register our Sender ID with Google' );


  gApp.DeviceReady = true;

  // Some Unique stuff here,
  // The first Parm is your Google email address that you were authorized to use GCM with
  // the Event Processing rountine (2nd parm) we pass in the String name
  // not a pointer to the routine, under the covers a JavaScript call is made so the name is used
  // to generate the function name to call. I didn't know how to call a JavaScript routine from Java
  // The last two parms are used by Cordova, they are the callback routines if the call is successful or fails
  //
  // CHANGE: your_app_id
  // TO: what ever your GCM authorized senderId is
  //
  window.GCM.register("your_sender_id", "GCM_Event", GCM_Success, GCM_Fail );

}, false );


function
GCM_Event(e)
{

  alert('EVENT -> RECEIVED:' + e.event);


  switch( e.event )
  {
  case 'registered':
    // the definition of the e variable is json return defined in GCMReceiver.java
    // In my case on registered I have EVENT and REGID defined
    gApp.gcmregid = e.regid;
    if ( gApp.gcmregid.length > 0 )
    {
      alert('REGISTERED -> REGID:' + e.regid);


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

    break

  case 'message':
    // the definition of the e variable is json return defined in GCMReceiver.java
    // In my case on registered I have EVENT, MSG and MSGCNT defined

    // You will NOT receive any messages unless you build a HOST server application to send
    // Messages to you, This is just here to show you how it might work

    alert('MESSAGE -> MSG:' + e.message);

    alert('MESSAGE -> MSGCNT:' + e.msgcnt);


    break;


  case 'error':

    alert('ERROR -> MSG:' + e.msg);

    break;



  default:
    alert('EVENT -> Unknown, an event was received and we do not know what it is');

    break;
  }
}

function
GCM_Success(e)
{
  alert('GCM_Success -> We have successfully registered and called the GCM plugin, waiting for GCM_Event:reistered -> REGID back from Google');

}

function
GCM_Fail(e)
{
  alert('GCM_Fail -> GCM plugin failed to register');

  alert('GCM_Fail -> ' + e.msg);

}

