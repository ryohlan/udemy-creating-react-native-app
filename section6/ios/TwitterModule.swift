//
//  TwitterModule.swift
//  twitter_client
//
//  Created by hara Ryo on H30/03/09.
//  Copyright © 平成30年 Facebook. All rights reserved.
//

import Foundation
import TwitterKit

@objc(TwitterModule)
class TwitterModule: NSObject {
  @objc(auth:reject:)
  func auth(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    Twitter.sharedInstance().logIn(completion: { (session, error) in
      if let session = session {
        resolve([
          "id": session.userID,
          "name": session.userName,
          ])
      } else {
        reject(nil, nil, error)
      }
    })
  }
  
  @objc(tweet)
  func tweet() {
    guard let vc = (UIApplication.shared.delegate as? AppDelegate)?.window?.rootViewController else { return }
    let composer = TWTRComposer()
    composer.setText("just setting up my Twitter Kit")
    composer.show(from: vc, completion: {(result) in
      if (result == .done) {
        print("Successfully composed Tweet")
      } else {
        print("Cancelled composing")
      }
    })
  }

  @objc(isLogined:reject:)
  func isLogined(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    resolve(Twitter.sharedInstance().sessionStore.existingUserSessions().count > 0)
  }
  
  @objc(getTimeline:reject:)
  func getTimeline(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    let client = TWTRAPIClient.withCurrentUser()
    let endpoint = "https://api.twitter.com/1.1/statuses/home_timeline.json"
    let request = client.urlRequest(withMethod: "GET", url: endpoint, parameters: nil, error: nil)
    client.sendTwitterRequest(request, completion: {(response,data, e) in
      if let e = e {
        print(e);
        return
      }
      do {
        let json = try JSONSerialization.jsonObject(with: data!, options: [])
        resolve(json)
      } catch {
        resolve([])
      }
    })
  }
}
