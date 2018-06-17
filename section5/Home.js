import React from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import Firebase from "react-native-firebase";

class Home extends React.Component {
  state = {
    data: []
  };

  componentDidMount() {
    Firebase.database()
      .ref("images")
      .on("value", d => {
        this.setState({
          data: Object.values(d.toJSON()).map(({ downloadURL }) => downloadURL)
        });
      });
  }

  render() {
    console.log(this.state);
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          data={this.state.data}
          keyExtractor={key => key}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={{ width: "100%", height: 200 }}
            />
          )}
        />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("NewPost")}
          style={{
            position: "absolute",
            right: 20,
            bottom: 20,
            height: 80,
            width: 80,
            borderRadius: 40,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#333"
          }}
        >
          <Text style={{ color: "#FFF" }}>New</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Home;
