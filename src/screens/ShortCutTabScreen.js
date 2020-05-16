import { Container } from "native-base";
import React, { Component } from "react";
import { ScrollView, ActivityIndicator, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FloatingButton from "../components/FloatingButton";
import Section from "../components/Section";
import { colors } from "../style/AppStyle";

export default class ShortCutScreen extends Component {
  static navigationOptions = {
    tabBarLabel: "SHORTCUTS",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="fan" size={25} color={colors.white} />
    )
  };

  state = {
    shortcutList: [],
    loading: true
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
      setTimeout(this.getAllShortCuts, 5000)
    }).catch(error => {
      this.setState({
        shortcutList: [],
        loading: false
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
          shortcutList: res.scenes != undefined ? res.scenes : [],
          loading: false
        })
      }).catch(error => {
        this.setState({
          shortcutList: [],
          loading: false
        })
      })
  }

  render() {
    const { navigation } = this.props;
    return (
      <Container style={{ backgroundColor: colors.lightWhite }}>
        {
          this.state.loading == true ? <View style={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
          }}><ActivityIndicator size="large" color={colors.headerColor} /></View> :
            <View style={{ flex: 1 }}>
              <ScrollView>
                <Section title={"Shortcuts"} data={this.state.shortcutList} />
              </ScrollView>
              <FloatingButton navigation={navigation} />
            </View>
        }
      </Container>
    );
  }
}
