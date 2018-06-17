import React from 'react';
import { StyleSheet, FlatList, Image, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';

const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: '100%',
    backgroundColor: '#EEE',
  },
  repoName: {
    fontSize: 20,
    width: '100%',
  },
  image: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  ownerName: {
    fontSize: 14,
  },
  cell: {
    padding: 16,
    backgroundColor: 'white',
  },
  indicator: {
    margin: 20,
  }
});

export default ({ items, refreshing, onRefresh, onEndReached, onPressItem }) => (
  <FlatList
    style={styles.list}
    data={items}
    refreshing={refreshing}
    onRefresh={onRefresh}
    keyExtractor={(item) => item.id}
    ItemSeparatorComponent={() => <View style={{ height: 1}} />}
    onEndReached={onEndReached}
    onEndReachedThreshold={0.1}
    renderItem={({ item }) => (
      <TouchableOpacity onPress={() => onPressItem(item)}>
        <View style={styles.cell}>
          <Text style={styles.repoName}>{item.full_name}</Text>
          <View style={{ flexDirection: 'row',alignItems: 'center', marginTop: 5}}>
            <Image style={styles.image} source={{uri: item.owner.avatar_url}}/>
            <Text style={styles.ownerName}>{item.owner.login}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )}
  />
);