import React, { Component } from "react";
import { ScrollView } from "react-native";
import { Container } from "native-base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FloatingButton from "../components/FloatingButton";
import Section from "../components/Section";
import { colors } from "../style/AppStyle";

export default class AreaScreen extends Component {
  static navigationOptions = {
    tabBarLabel: "Areas",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="fan" size={25} color={colors.white} />
    )
  };
  render() {
    const { navigation } = this.props;
    return (
      <Container style={{ backgroundColor: colors.lightWhite }}>
        <ScrollView>
          <Section title={"Areas"} />
        </ScrollView>
        <FloatingButton navigation={navigation} />
      </Container>
    );
  }
}
