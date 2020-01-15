import { Container, Text, Card, CardItem, Body } from "native-base";
import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View, Divider } from "react-native";

export default class ActionList extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#1f1f1f"
    },

    headerTintColor: "#FFF"
  };

  render() {
    const { navigation } = this.props;
    return (
      <Container style={styles.container}>
        <View style={{ marginTop: 100 }}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate("CREATE_SHORTCUT")}
          >
            <Card transparent style={styles.card}>
              <CardItem header style={{ backgroundColor: "#101010" }}>
                <Text style={styles.headerTitle}>Create a ShortCut</Text>
              </CardItem>
              <CardItem header style={{ backgroundColor: "#101010" }}>
                <Body>
                  <Text style={styles.body}>
                    Controls actions on multiple device from a single event
                  </Text>
                </Body>
              </CardItem>
            </Card>
          </TouchableOpacity>
          {/* <View
            style={{
              borderBottomColor: "#FFF",
              borderBottomWidth: 0.5,
              marginLeft: 70,
              marginRight: 80
            }}
          /> */}
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate("CREATE_AREA")}
          >
            <Card transparent style={styles.card}>
              <CardItem header style={{ backgroundColor: "#101010" }}>
                <Text style={styles.headerTitle}>Create an Area</Text>
              </CardItem>
              <CardItem header style={{ backgroundColor: "#101010" }}>
                <Body>
                  <Text style={styles.body}>
                    A group which can have one or more devices
                  </Text>
                </Body>
              </CardItem>
            </Card>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#101010"
  },
  box: {
    marginLeft: 50,
    marginRight: 50
  },
  card: {
    marginTop: 25
  },
  headerTitle: {
    color: "#E9E9E9",
    fontSize: 24,
    fontWeight: "300"
  },
  body: {
    color: "#696969",
    fontSize: 14
  }
});
