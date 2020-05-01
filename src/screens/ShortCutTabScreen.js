import { Container } from "native-base";
import React, { Component } from "react";
import { ScrollView } from "react-native";
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

  state = {
    shortcutList: []
  }

  componentDidMount() {
    const shortCutOptions = {
      url: "http://13.232.56.9/api/v1/home/client?uuid=24956",
      body: { "method": "GET", "url": "/VIEWSCENES" }
    }

    fetch(shortCutOptions.url, {
      method: "POST",
      body: JSON.stringify(shortCutOptions.body)
    }).then(res => {
      setTimeout(this.getAllShortCuts, 500)
    }).catch(error => {
      this.setState({
        shortcutList: []
      })
    })
  }

  getAllShortCuts = () => {
    const shortCutOptions = {
      url: "http://13.232.56.9/api/v1/home/client?uuid=24956"
    }
    fetch(shortCutOptions.url).then(response => response.json())
      .then(res => {
        this.setState({
          shortcutList: res.scenes != undefined ? res.scenes : []
        })
      }).catch(error => {
        this.setState({
          shortcutList: []
        })
      })
  }

  render() {
    const { navigation } = this.props;
    return (
      <Container style={{ backgroundColor: colors.lightWhite }}>
        <ScrollView>
          <Section title={"Shortcuts"} data={this.state.shortcutList} />
        </ScrollView>
        <FloatingButton navigation={navigation} />
      </Container>
    );
  }
}
