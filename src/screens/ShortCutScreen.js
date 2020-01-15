import React, { Component } from "react";
import { Container } from "native-base";

import { SafeAreaView, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FloatingButton from "../components/FloatingButton";
import Section from "../components/Section";
import { colors } from "../style/AppStyle";

export default class ShortCutScreen extends Component {
  static navigationOptions = {
    tabBarLabel: "Shortcuts",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="fan" size={25} color={colors.white} />
    )
  };
  render() {
    const { navigation } = this.props;
    return (
      <Container style={{ backgroundColor: colors.lightWhite }}>
        <ScrollView>
          <Section title={"Shortcuts"} />
        </ScrollView>
        <FloatingButton navigation={navigation} />
      </Container>
    );
  }
}
