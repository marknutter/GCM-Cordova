package com.redeguia.mobile;

import com.google.android.gcm.*;
import org.json.JSONException;
import org.json.JSONObject;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import com.plugin.GCM.GCMPlugin;

public class GCMIntentService extends GCMBaseIntentService {

  public static final String ME = "GCMReceiver";
  private static final String TAG = "GCMIntentService";

  public GCMIntentService() {
    super("GCMIntentService");
  }

  @Override
  public void onRegistered(Context context, String regId) {

    Log.v(ME + ":onRegistered", "Registration ID arrived!");
    Log.v(ME + ":onRegistered", regId);

    JSONObject json;

    try {
      json = new JSONObject().put("event", "registered");
      json.put("regid", regId);

      Log.v(ME + ":onRegisterd", json.toString());

      GCMPlugin.sendJavascript(json);
    } catch (JSONException e) {
      Log.e(ME + ":onRegisterd", "JSON exception");
    }
  }

  @Override
  public void onUnregistered(Context context, String regId) {
    Log.d(TAG, "onUnregistered - regId: " + regId);

    try {
      JSONObject json;
      json = new JSONObject().put("event", "unregistered");
      json.put("regid", regId);

      Log.v(ME + ":onUnregistered ", json.toString());
      GCMPlugin.sendJavascript(json);
    } catch (JSONException e) {
      Log.e(ME + ":onUnregistered", "JSON exception");
    }
  }

  @Override
  protected void onMessage(Context context, Intent intent) {
    Log.d(TAG, "onMessage - context: " + context);

    Bundle extras = intent.getExtras();
    if (extras != null) {
      try {
        JSONObject json = new JSONObject().put("event", "message");

        for (String string : extras.keySet())
          json.put(string, extras.getString(string));

        json.put("msgcnt", extras.getString("msgcnt"));

        GCMPlugin.sendJavascript(json);

        Log.v(ME + ":onMessage ", json.toString());
      } catch (JSONException e) {
        Log.e(ME + ":onMessage", "JSON exception");
      }
    }
  }

  @Override
  public void onError(Context context, String errorId) {
    Log.e(TAG, "onError - errorId: " + errorId);
  }
}