function gcm_register() {
  // the Project Number is a ID provided by developers.google.com
  window.GCM.register("!!Project Number!!", "GCM_Event", GCM_Success, GCM_Fail );
}

function gcm_unregister() {
  window.GCM.unregister(GCM_Success, GCM_Fail);
}

function GCM_Success(e) {
  // when Connect at GCM - Google API
}

function GCM_Fail(e) {
  // when fail conection with GCM - Google API
}

function GCM_Event(e) {
  switch (e.event) {
    case 'registered':    registered(e);    break;
    case 'unregistered':  unregistered(e);  break;
    case 'message':     message(e);     break;
  }
}

function registered(e) {
  // your device are registered on GCM service.
  // now, save the 'e.regid' (Registration ID of device) on your server!!
}

function unregistered(e) {
  // your device are unregistered on GCM service.
  // now, remove the 'e.regid' (Registration ID of device) on your server!!
}

function message(e) {
  // the message of GCM are inside the 'e' parameter.
  // example: 'e.status_of_my_server';
}