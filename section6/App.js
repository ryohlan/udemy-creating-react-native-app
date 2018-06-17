/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NativeModules,
  FlatList
} from "react-native";

export default class App extends Component<{}> {
  state = {
    logined: false,
    data: []
  };

  constructor(props) {
    super(props);
    NativeModules.TwitterModule.isLogined().then(logined => {
      this.setState({ logined });
      if (logined) {
        NativeModules.TwitterModule.getTimeline().then(data =>
          this.setState({ data })
        );
      }
    });
  }

  render() {
    const { logined, data } = this.state;
    if (logined) {
      return (
        <View style={styles.container}>
          <FlatList
            style={{ flex: 1 }}
            data={data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={{ padding: 10 }}>
                <Text style={{ color: "#333", fontSize: 10 }}>
                  {item.user.name}
                </Text>
                <Text style={{ color: "#000", fontSize: 14 }}>{item.text}</Text>
              </View>
            )}
          />
          <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: "#AAA",
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              right: 20,
              bottom: 20
            }}
            onPress={() => NativeModules.TwitterModule.tweet()}
          >
            <Text style={{ color: "#FFF", fontSize: 30 }}>+</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            NativeModules.TwitterModule.auth().then(r => console.log(r))
          }
        >
          <Text style={styles.welcome}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
