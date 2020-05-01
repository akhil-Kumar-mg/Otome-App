import { Button, Container, Content, Input, Item, View } from "native-base";
import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { withNavigation } from "react-navigation";
import { colors } from "../style/AppStyle";
import Scheduler from "../components/Scheduler";

export default class CreateShortCut extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: colors.headerColor
      },
      headerTintColor: colors.white,
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("HOME")}>
          <Text style={{ color: colors.white, fontSize: 16, marginRight: 15 }}>
            Cancel
          </Text>
        </TouchableOpacity>
      )
    };
  };

  render() {
    const { navigation } = this.props
    return (
      <Container style={styles.container}>
        <Content>
          <View>
            <Text style={styles.heading}>Create a ShortCut</Text>
          </View>
          <Item regular style={styles.inputBox}>
            <Input
              style={{ fontSize: 15, marginLeft: 5 }}
              placeholder="Type shortcut name here"
              placeholderTextColor={colors.buttonColor}
            />
          </Item>
          <Button
            style={styles.scheduleBtn}
            onPress={() => navigation.navigate("SCHEDULER")}
          >
            <Text style={{ color: colors.white, fontSize: 20, fontWeight: "400" }}>Add a Schedule</Text>
          </Button>
        </Content>
        <Button block style={styles.nextButton}
          onPress={() => navigation.navigate("CREATE_ACTION_SET")}>
          <Text style={{ color: "white", fontSize: 18 }}>Next</Text>
        </Button>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBG
  },
  heading: {
    flex: 1,
    color: colors.buttonColor,
    marginTop: 100,
    marginLeft: 20,
    fontSize: 25
  },
  inputBox: {
    flex: 1,
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 4,
    minHeight: 60,
    backgroundColor: colors.white
  },
  nextButton: {
    minHeight: 60,
    backgroundColor: colors.headerColor
  },
  scheduleBtn: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    backgroundColor: colors.buttonColor
  }
});
