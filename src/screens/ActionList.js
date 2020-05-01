import { Container, Button } from "native-base";
import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors } from "../style/AppStyle";
import Icon from "react-native-vector-icons/Entypo";

export default class ActionList extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: colors.headerColor
    },
    headerTintColor: colors.white
  };

  render() {
    const { navigation } = this.props;
    return (
      <Container style={styles.container}>
        <View style={{ marginTop: 100 }}>
          <Button
            style={styles.actBtn}
            onPress={() => navigation.navigate("ADD_DEVICE")}
          >
            <View style={{ flexDirection: "row" }}>
              <Icon name="dots-three-vertical" size={50} color={colors.white}></Icon>
              <View style={{ flexDirection: "column", marginLeft: 10 }}>
                <Text style={{ color: colors.white, fontSize: 25, fontWeight: "400" }}>Add a Device</Text>
                <Text style={{ color: colors.yellow, fontSize: 14 }}>Register a device here</Text>
              </View>
            </View>
          </Button>
          <Button
            style={styles.actBtn}
            onPress={() => navigation.navigate("CREATE_AREA")}
          >
            <View style={{ flexDirection: "row" }}>
              <Icon name="dots-three-vertical" size={50} color={colors.white}></Icon>
              <View style={{ flexDirection: "column", marginLeft: 10 }}>
                <Text style={{ color: colors.white, fontSize: 25, fontWeight: "400" }}>Create an Area</Text>
                <Text style={{ color: colors.yellow, fontSize: 14 }}>A group which can have one or more devices</Text>
              </View>
            </View>
          </Button>
          <Button
            style={styles.actBtn}
            onPress={() => navigation.navigate("CREATE_SHORTCUT")}
          >
            <View style={{ flexDirection: "row" }}>
              <Icon name="dots-three-vertical" size={50} color={colors.white}></Icon>
              <View style={{ flexDirection: "column", marginLeft: 10, flex: 1, flexWrap: "wrap" }}>
                <Text style={{ color: colors.white, fontSize: 25, fontWeight: "400" }}>Create a Shortcut</Text>
                <Text style={{ color: colors.yellow, fontSize: 14 }} >Control multiple devices from a single click</Text>
              </View>
            </View>
          </Button>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.primaryBG
  },

  headerTitle: {
    color: colors.green,
    fontSize: 24,
    fontWeight: "300"
  },

  actBtn: {
    minHeight: 100,
    backgroundColor: colors.buttonColor,
    margin: 15,
    borderRadius: 10,
    padding: 0
  }
});
