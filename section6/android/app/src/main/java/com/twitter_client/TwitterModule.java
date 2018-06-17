package com.twitter_client;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.twitter.sdk.android.core.Callback;
import com.twitter.sdk.android.core.Result;
import com.twitter.sdk.android.core.TwitterApiClient;
import com.twitter.sdk.android.core.TwitterCore;
import com.twitter.sdk.android.core.TwitterException;
import com.twitter.sdk.android.core.TwitterSession;
import com.twitter.sdk.android.core.identity.TwitterAuthClient;
import com.twitter.sdk.android.core.models.Tweet;
import com.twitter.sdk.android.core.services.StatusesService;
import com.twitter.sdk.android.tweetcomposer.TweetComposer;

import java.util.List;

import retrofit2.Call;

public class TwitterModule extends ReactContextBaseJavaModule implements ActivityEventListener {
    private TwitterAuthClient authClient;

    public TwitterModule(ReactApplicationContext reactContext) {
        super(reactContext);
        authClient = new TwitterAuthClient();
        reactContext.addActivityEventListener(this);
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        authClient.onActivityResult(requestCode, resultCode, data);
    }

    @Override
    public void onNewIntent(Intent intent) {

    }

    @Override
    public String getName() {
        return "TwitterModule";
    }

    @ReactMethod
    public void auth(final Promise promise) {
        if (getCurrentActivity() != null) {
            authClient.authorize(getCurrentActivity(), new Callback<TwitterSession>() {
                @Override
                public void success(Result<TwitterSession> result) {
                    WritableMap map = Arguments.createMap();
                    map.putDouble("id", result.data.getUserId());
                    map.putString("name", result.data.getUserName());
                    promise.resolve(map);
                }

                @Override
                public void failure(TwitterException exception) {
                    promise.reject(exception);
                }
            });
        }
    }

    @ReactMethod
    public void tweet() {
        if (getCurrentActivity() != null) {
            new TweetComposer.Builder(getCurrentActivity())
                    .text("just setting up my Twitter Kit.")
                    .show();
        }
    }

    @ReactMethod
    public void isLogined(Promise promise) {
        promise.resolve(!TwitterCore.getInstance().getSessionManager().getSessionMap().isEmpty());
    }

    @ReactMethod
    public void getTimeline(final Promise promise) {
        TwitterApiClient twitterApiClient = TwitterCore.getInstance().getApiClient();
        StatusesService statusesService = twitterApiClient.getStatusesService();
        Call<List<Tweet>> call = statusesService.homeTimeline(20, null, null, null, null, true, true);
        call.enqueue(new Callback<List<Tweet>>() {
            @Override
            public void success(Result<List<Tweet>> result) {
                WritableArray array = Arguments.createArray();
                for (Tweet tw : result.data) {
                    WritableMap map = Arguments.createMap();
                    map.putDouble("id", tw.getId());
                    map.putString("text", tw.text);
                    WritableMap user = Arguments.createMap();
                    user.putString("name", tw.user.name);
                    map.putMap("user", user);
                    array.pushMap(map);
                }
                promise.resolve(array);
            }

            @Override
            public void failure(TwitterException exception) {
                promise.resolve(Arguments.createArray());
            }
        });
    }
}
