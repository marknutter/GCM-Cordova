# Cordova GCM Push Notifications Plugin for Android

---

## About

This plugin is for use with [Cordova](http://incubator.apache.org/cordova/) and in an Android project to enable push notifications via [Google's GCM (Google Cloud Messaging) service](http://developer.android.com/guide/google/gcm/index.html). Previously, push notifications on Android used C2DM, but that [has since been deprecated](http://developer.android.com/guide/google/gcm/c2dm.html).

__Important - this demo will not go through the complete registration process on an emulator (it will work on a real device). To get it to work on an emulator, you need to install the right libraries. You can follow [this guide](http://www.androidhive.info/2012/10/android-push-notifications-using-google-cloud-messaging-gcm-php-and-mysql/) under the section titled "Installing helper libraries and setting up the Emulator"__



## Installation

Add the com.google.android.gcm and com.plugin.GCM packages to your project. Add the GCMIntentService.java file to your application's main package.

Modify your src.app_name.gcm.GCMIntentService.java "package" name on the first line to use you application name.

Modify your AndroidManifest.xml to include the following lines to your manifest tag, replacing your_app_package with your app's package path:


    <uses-permission android:name="android.permission.GET_ACCOUNTS" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />

    <uses-permission android:name="com.google.android.c2dm.permission.RECEIVE" />
    <permission android:name="your_app_package.permission.C2D_MESSAGE" android:protectionLevel="signature" />
    <uses-permission android:name="your_app_package.permission.C2D_MESSAGE" />


Modify your AndroidManifest.xml to include the following lines to your application tag, replacing your_app_package with your app's package path:


    <receiver android:name="com.google.android.gcm.GCMBroadcastReceiver" android:permission="com.google.android.c2dm.permission.SEND" >
      <intent-filter>
        <action android:name="com.google.android.c2dm.intent.RECEIVE" />
        <action android:name="com.google.android.c2dm.intent.REGISTRATION" />
        <category android:name="your_app_package" />
      </intent-filter>
    </receiver>

    <service android:name=".GCMIntentService" />


Modify your res/xml/config.xml to include the following line in order to tell Cordova to include this plugin and where it can be found:

    <plugin name="GCMPlugin" value="com.plugin.GCM.GCMPlugin" />


Follow the instructions [here](http://developer.android.com/guide/google/gcm/gs.html) on creating a Google API project to obtain a GCM sender ID. Replace all instances of "your_sender_id" in this plugin with that id (make sure you pass the ID as a string, not an int).
Add your app to the [Google Play Store] and input your API keys in the "Services & APIs" section. No need to go live with the app to test it out.

Add the GCMPlugin.js script to your assets/www folder (or javascripts folder, wherever you want really) and include it in your main index.html file.

    <script type="text/javascript" charset="utf-8" src="GCMPlugin.js"></script>


In the CORDOVA_GCM_script.js script you will see an example of how to interact with the GCMplugin. Modify it to suit your needs.

## Support ##

[![Get Support](http://codersclan.net/graphics/getSupport_github4.png)](http://codersclan.net/support/step1.php?repo_id=3)

## Notes and Gotchas

If you run this demo using the emulator you will not receive notifications from GCM. You need to run it on an actual device to receive messages or install the proper libraries on your emulator (You can follow [this guide](http://www.androidhive.info/2012/10/android-push-notifications-using-google-cloud-messaging-gcm-php-and-mysql/) under the section titled "Installing helper libraries and setting up the Emulator")

If everything seems right and you are not receiving a registration id response back from Google, try uninstalling and reinstalling your app. That has worked for some devs out there.

Google gcm supports booth json and plain text messages but this plugin is setup for json use only

If you copy the AndroidManifest.xml settings from the readme page on github, you may run into issues with invalid whitespace. If so, remove all white spaces and manually re-add them or copy the manifest settings directly from the file (not the web).


## LICENSE ##

The MIT License

Copyright (c) 2013 Mark Nutter

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


