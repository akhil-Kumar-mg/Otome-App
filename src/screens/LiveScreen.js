import { Container } from "native-base";
import React, { Component } from "react";
import { ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import FloatingButton from "../components/FloatingButton";
import Section from "../components/Section";
import { colors } from "../style/AppStyle";

export default class LiveScreen extends Component {
  static navigationOptions = {
    tabBarLabel: "Live",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="home" size={25} color={colors.white} />
    )
  };
  render() {
    const { navigation } = this.props;
    return (
      <Container style={{ backgroundColor: colors.lightWhite }}>
        <ScrollView>
          <Section title={"Live Devices"} />
        </ScrollView>
        <FloatingButton navigation={navigation} />
      </Container>
    );
  }
}
