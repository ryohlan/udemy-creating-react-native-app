import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  repoName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ownerIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  ownerName: {
    fontSize: 14
  },
  repoUrl: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default ({ navigation: { state: { params: { item }}} }) => (
  <View style={styles.container}>
    <Text style={styles.repoName}>{item.full_name}</Text>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image style={styles.ownerIcon} source={{ uri: item.owner.avatar_url }}/>
      <Text style={styles.ownerName}>{item.owner.login}</Text>
    </View>
    <Text style={styles.repoUrl}>{item.url}</Text>
    <Text style={styles.description}>{item.description}</Text>
  </View>
);