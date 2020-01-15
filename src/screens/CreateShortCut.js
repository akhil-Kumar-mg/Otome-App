import { Button, Container, Content, Input, Item, View } from "native-base";
import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";
import Scheduler from "../components/Scheduler";
import { TouchableOpacity } from "react-native-gesture-handler";
import { withNavigation } from "react-navigation";

export default class CreateShortCut extends Component {
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
          <View>
            <Text style={styles.heading}>Create a ShortCut</Text>
          </View>
          <Item regular style={styles.inputBox}>
            <Input
              style={{ color: "#696969" }}
              placeholder="Type shortcut name here"
            />
          </Item>
          <Scheduler />
        </Content>
        <Button block style={styles.nextButton}>
          <Text style={{ color: "white", fontSize: 20 }}>Next</Text>
        </Button>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101010"
  },
  heading: {
    flex: 1,
    color: "#FFFFF1",
    marginTop: 100,
    marginLeft: 20,
    fontSize: 25
  },
  inputBox: {
    flex: 1,
    borderColor: "#FFFFF1",
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 4,
    backgroundColor: "#FFFFF1"
  },
  nextButton: {
    minHeight: 60,
    backgroundColor: "#175E17"
  }
});
