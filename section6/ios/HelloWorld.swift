//
//  HelloWorld.swift
//  twitter_client
//
//  Created by hara Ryo on H30/03/09.
//  Copyright © 平成30年 Facebook. All rights reserved.
//

import Foundation
import UIKit

@objc(HelloWorld)
class HelloWorld: NSObject {
  @objc(say)
  func say(){
    let alert: UIAlertController = UIAlertController(title: "Alert", message: "message", preferredStyle: UIAlertControllerStyle.alert)
    alert.addAction(UIAlertAction(title: "close", style: .cancel))
    if let appDelegate = UIApplication.shared.delegate as? AppDelegate {
      appDelegate.window.rootViewController?.present(alert, animated: true, completion: nil)
    }
  }
}
