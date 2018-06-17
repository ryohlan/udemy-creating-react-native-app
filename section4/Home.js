/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Platform,
  AppState
} from 'react-native';
import RepositoryList from './RepositoryList';

export default class App extends Component<{}> {
  state = {
    items: [],
    text: '',
    fetching: false,
  }
  page = 0;

  fetchRepositories(refresh) {
    const { text, refreshing } = this.state;
    if(text === '' || refreshing) return;
    const nextPage = refresh ? 1 : this.page + 1;
    this.setState({ fetching: true });
    fetch(`https://api.github.com/search/repositories?q=${text}&page=${nextPage}`)
      .then(r => r.json())
      .then(({ items = [] }) => {
        this.page = nextPage;
        const newItems = refresh ? items : this.state.items.concat(items);
        this.setState({ items: newItems, refreshing: false})
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
        this.setState({ fetching: false })
      });
  }

  componentDidMount() {
    AppState.addEventListener('change', this.onChangeAppState);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.onChangeAppState);
  }

  onChangeAppState = (appState) => {
    if(appState === 'active') {
      this.fetchRepositories(true);
    }
  }

  render() {
    const { items, fetching } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <TextInput style={styles.input} onChangeText={(text) => this.setState({ text })} />
          <TouchableOpacity style={styles.searchButton} onPress={() => this.fetchRepositories(true)}>
            <Text>Search</Text>
          </TouchableOpacity>
        </View>
        <RepositoryList
          items={items}
          refreshing={this.page === 0 && fetching}
          onRefresh={() => this.fetchRepositories(true)}
          onEndReached={() => this.fetchRepositories()}
          onPressItem={(item)=>  this.props.navigation.navigate('Detail', { item })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  inputWrapper: {
    width:'100%',
    padding: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: Platform.select({ios: '#F3F3F3', android: 'transparent'}),
    borderRadius: 6,
  },
  searchButton: {
    padding: 10,
  }
});
