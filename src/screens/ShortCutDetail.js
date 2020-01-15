import { Button, Container, Icon } from "native-base";
import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View, Time } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class ShortCutDetail extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#1f1f1f"
    },
    headerTintColor: "#FFF",
    headerRight: () => (
      <Button
        style={{
          backgroundColor: "transparent"
        }}
      >
        <Icon type="MaterialIcons" name="delete" />
      </Button>
    )
  };

  render() {
    return (
      <Container style={styles.container}>
        <View style={{ marginBottom: 15, marginLeft: 15 }}>
          <Text style={styles.scheduleTxt}>Scheduled</Text>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "#FFF",
                fontWeight: "600",
                marginLeft: 15,
                fontSize: 16,
                marginTop: 15
              }}
            >
              12:00 PM
            </Text>
            <View
              style={{ flexDirection: "row", right: 20, position: "absolute" }}
            >
              <Text style={styles.dayON}>M</Text>
              <Text style={styles.dayOFF}>T</Text>
              <Text style={styles.dayON}>W</Text>
              <Text style={styles.dayON}>T</Text>
              <Text style={styles.dayON}>F</Text>
              <Text style={styles.dayOFF}>S</Text>
              <Text style={styles.dayON}>S</Text>
            </View>
          </View>
        </View>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <ShortCut />}
          keyExtractor={item => item.id}
        />
      </Container>
    );
  }
}

class ShortCut extends Component {
  render() {
    return (
      <View style={{ marginBottom: 15 }}>
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
            renderItem={({ item }) => <ShortCutItem />}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    );
  }
}

const ShortCutItem = item => {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <Text style={styles.deviceName}>Light</Text>
      <Text style={styles.deviceStatus}>ON</Text>
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
  itemTitle: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 15,
    color: "#E9E9E9"
  },
  scheduleTxt: {
    marginTop: 10,
    fontSize: 15,
    color: "#E9E9E9"
  },

  titleIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    color: "#E9E9E9",
    marginRight: 10,
    marginTop: 10,
    backgroundColor: "transparent"
  },
  deviceName: {
    color: "#D3D3D3",
    fontSize: 13,
    marginLeft: 40,
    marginTop: 20
  },
  deviceStatus: {
    position: "absolute",
    right: 0,
    marginTop: 20,
    marginRight: 20,
    color: "#D3D3D3",
    fontWeight: "600",
    color: "lime"
  },
  dayON: {
    color: "lime",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 15,
    marginTop: 15
  },
  dayOFF: {
    color: "red",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 15,
    marginTop: 15
  }
});
