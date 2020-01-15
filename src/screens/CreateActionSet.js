import React, { Component } from "react";
import { Container, Content, Button, Switch, Icon } from "native-base";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from "react-native";

export default class CreateActionSet extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: "#1f1f1f"
      },
      headerTintColor: "#FFF",
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("HOME")}>
          <Text style={{ color: "#FFF", fontSize: 16, marginRight: 15 }}>
            Cancel
          </Text>
        </TouchableOpacity>
      )
    };
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <View style={styles.header}>
            <Text style={styles.headerTxt}>Create your action set</Text>
          </View>
          <FlatList
            data={DATA}
            renderItem={({ item }) => <Item />}
            keyExtractor={item => item.id}
          />
        </Content>
        <Button block style={styles.saveBtn}>
          <Text style={{ color: "white", fontSize: 20 }}>Next</Text>
        </Button>
      </Container>
    );
  }
}

class Item extends Component {
  render() {
    return (
      <View style={{ marginBottom: 15, marginLeft: 15 }}>
        <TouchableOpacity>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text style={styles.itemTitle}> Grand Bedroom</Text>
            <Icon
              style={styles.titleIcon}
              type="Entypo"
              name="chevron-small-right"
            />
          </View>
        </TouchableOpacity>
        <View>
          <FlatList
            data={DATA}
            renderItem={({ item }) => <ItemDetail />}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    );
  }
}

const ItemDetail = item => {
  return (
    <View style={{ flex: 1, flexDirection: "row", marginLeft: 10 }}>
      <Switch trackColor={{ true: "lime", false: "white" }} value={false} />
      <Text style={styles.deviceName}>Light</Text>
      <Button>
        <Text style={{ color: "white", fontSize: 20 }}>Add</Text>
      </Button>
    </View>
  );
};

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item"
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item"
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101010"
  },
  header: {
    marginTop: 40,
    marginLeft: 15
  },
  headerTxt: {
    fontSize: 22,
    color: "#FFF"
  },
  saveBtn: {
    minHeight: 60,
    backgroundColor: "#175E17"
  },
  itemTitle: {
    marginTop: 20,
    fontSize: 15,
    color: "#E9E9E9"
  },
  titleIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    color: "#E9E9E9",
    marginRight: 15,
    marginTop: 20,
    backgroundColor: "transparent"
  },
  deviceName: {
    color: "#D3D3D3",
    fontSize: 13,
    marginLeft: 40
  }
});
