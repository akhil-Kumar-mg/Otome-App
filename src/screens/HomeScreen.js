import { Container } from "native-base";
import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import FloatingButton from "../components/FloatingButton";
import Section from "../components/Section";
import { colors } from "../style/AppStyle";

export default class HomeScreen extends Component {
  static navigationOptions = {
    tabBarLabel: "Home",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="home" size={25} color={colors.white} />
    )
  };
  render() {
    const { navigation } = this.props;
    return (
      <Container style={{ backgroundColor: colors.lightWhite }}>
        <ScrollView>
          <Section title={"Shortcuts"} />
          <View
            style={{
              borderBottomColor: "#FFF",
              borderBottomWidth: 2
            }}
          />
          <Section title={"Areas"} />
        </ScrollView>
        <FloatingButton navigation={navigation} />
      </Container>
    );
  }
}
