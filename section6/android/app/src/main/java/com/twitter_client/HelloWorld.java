package com.twitter_client;

import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class HelloWorld extends ReactContextBaseJavaModule {
    public HelloWorld(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "HelloWorld";
    }

    @ReactMethod
    public void say() {
        if (getCurrentActivity() != null) {
            Toast.makeText(getCurrentActivity(), "Hello World", Toast.LENGTH_SHORT).show();
        }
    }
}
