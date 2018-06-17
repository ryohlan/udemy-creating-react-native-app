import { StackNavigator } from 'react-navigation';
import Home from './Home';
import Detail from './Detail';
import React from 'react';
import { Text } from 'react-native';

export default StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
    }
  },
  Detail: {
    screen: Detail,
    navigationOptions: ({ navigation: { state: { params: { item }}}}) => ({
      title: item.full_name,
    }),
  },
}, {
  initialRouteName: 'Home',
});