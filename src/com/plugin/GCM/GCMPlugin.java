package com.plugin.GCM;


//import java.io.*;
//import java.util.*;


import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;

import org.apache.cordova.CordovaWebView;
import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.apache.cordova.api.PluginResult;
import org.apache.cordova.api.PluginResult.Status;
import com.google.android.gcm.*;


/**
 * @author awysocki
 *
 */

public class GCMPlugin extends CordovaPlugin {

  public static final String ME="GCMPlugin";

  public static final String REGISTER="register";
  public static final String UNREGISTER="unregister";

  public static CordovaWebView gwebView;
  private static String gECB;
  private static String gSenderID;


  @Override
  public boolean execute(String action, JSONArray data, CallbackContext callbackContext)
  {

    boolean result = true;

    Log.v(ME + ":execute", "action=" + action);

    if (REGISTER.equals(action)) {

      Log.v(ME + ":execute", "data=" + data.toString());

      try {

        JSONObject jo= new JSONObject(data.toString().substring(1, data.toString().length()-1));

        gwebView = this.webView;

        Log.v(ME + ":execute", "jo=" + jo.toString());

        gECB = (String)jo.get("ecb");
        gSenderID = (String)jo.get("senderID");

        Log.v(ME + ":execute", "ECB="+gECB+" senderID="+gSenderID );

        GCMRegistrar.register(this.cordova.getActivity(), gSenderID);


        Log.v(ME + ":execute", "GCMRegistrar.register called ");

        result = true;
      }
      catch (JSONException e) {
        Log.e(ME, "Got JSON Exception "
          + e.getMessage());
        result = false;
      }
    }
    else if (UNREGISTER.equals(action)) {

      GCMRegistrar.unregister(this.cordova.getActivity());
      Log.v(ME + ":" + UNREGISTER, "GCMRegistrar.unregister called ");
      result = true;

    }
    else
    {
      result = false;
      Log.e(ME, "Invalid action : "+action);
    }

    return result;
  }


  public static void sendJavascript( JSONObject _json )
  {
    String _d =  "javascript:"+gECB+"(" + _json.toString() + ")";
        Log.v(ME + ":sendJavascript", _d);

        if (gECB != null ) {
          gwebView.sendJavascript( _d );
        }
  }


  /**
   * Gets the Directory listing for file, in JSON format
   * @param file The file for which we want to do directory listing
   * @return JSONObject representation of directory list. e.g {"filename":"/sdcard","isdir":true,"children":[{"filename":"a.txt","isdir":false},{..}]}
   * @throws JSONException
   */


}
