import React from "react";
import { View, Text } from "react-native";
import { StackNavigator } from "react-navigation";
import Home from "./Home";
import NewPost from "./NewPost";

export default StackNavigator({
  Home: {
    screen: Home
  },
  NewPost: {
    screen: NewPost
  }
});
