//
//  Bridge.m
//  twitter_client
//
//  Created by hara Ryo on H30/03/09.
//  Copyright © 平成30年 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(HelloWorld, NSObject)

RCT_EXTERN_METHOD(say)

@end

@interface RCT_EXTERN_MODULE(TwitterModule, NSObject)

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXTERN_METHOD(auth:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject )

RCT_EXTERN_METHOD(tweet)

RCT_EXTERN_METHOD(isLogined:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject )

RCT_EXTERN_METHOD(getTimeline:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject )

@end
