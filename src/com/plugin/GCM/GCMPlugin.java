package com.plugin.GCM;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;

import org.apache.cordova.api.Plugin;
import org.apache.cordova.api.PluginResult;
import org.apache.cordova.api.PluginResult.Status;
import com.google.android.gcm.*;

/**
 * Original @author awysocki
 * Co-@author Rafael Gumieri
 */

public class GCMPlugin extends Plugin {
  public static final String PLUGIN = "GCMPlugin";
  public static final String REGISTER = "register";
  public static final String UNREGISTER = "unregister";

  public static Plugin plugin;
  private static String gECB;
  private static String gSenderID;

  @Override
  @SuppressWarnings("deprecation")
  public PluginResult execute(String action, JSONArray data, String callbackId) {
    Log.v(PLUGIN + ":execute", "action=" + action);

    if    (REGISTER.equals(action)) return register(data);
    else if (UNREGISTER.equals(action)) return unregister();
    else return default_execution(action);
  }

  private PluginResult register(JSONArray data) {
    Log.v(PLUGIN + ":execute", "data=" + data.toString());

    try {
      JSONObject jo = new JSONObject(data.toString().substring(1, data.toString().length() - 1));
      Log.v(PLUGIN + ":execute", "jo=" + jo.toString());

      plugin    = this;
      gECB    = (String) jo.get("ecb");
      gSenderID = (String) jo.get("senderID");
      Log.v(PLUGIN + ":execute", "ECB=" + gECB + " senderID=" + gSenderID);

      boolean isRegistered = GCMRegistrar.isRegistered(this.ctx.getContext());
      Log.v(PLUGIN + ":execute", "GCMRegistrar.isRegistered called. Value=" + isRegistered);

      if (isRegistered) return new PluginResult(Status.NO_RESULT);

      GCMRegistrar.register(this.ctx.getContext(), gSenderID);
      Log.v(PLUGIN + ":execute", "GCMRegistrar.register called ");

      return new PluginResult(Status.OK);
    } catch (JSONException e) {
      Log.e(PLUGIN, "Got JSON Exception " + e.getMessage());
      return new PluginResult(Status.JSON_EXCEPTION);
    }
  }

  private PluginResult unregister() {
    Log.v(PLUGIN + ":" + UNREGISTER, "GCMRegistrar.unregister called ");
    GCMRegistrar.unregister(this.ctx.getContext());

    return new PluginResult(Status.NO_RESULT);
  }

  private PluginResult default_execution(String action) {
    Log.e(PLUGIN, "Invalid action : " + action);

    return new PluginResult(Status.INVALID_ACTION);
  }

  public static void sendJavascript(JSONObject _json) {
    String _d = "javascript:" + gECB + "(" + _json.toString() + ")";

    if (gECB != null) plugin.sendJavascript(_d);
    Log.v(PLUGIN + ":sendJavascript", _d);
  }

  /**
   * Gets the Directory listing for file, in JSON format
   * 
   * @param file
   *            The file for which we want to do directory listing
   * @return JSONObject representation of directory list. e.g
   *         {"filename":"/sdcard"
   *         ,"isdir":true,"children":[{"filename":"a.txt"
   *         ,"isdir":false},{..}]}
   * @throws JSONException
   */
}