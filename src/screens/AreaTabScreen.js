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
  state = {
    areaList: []
  }
  componentDidMount() {
    const areaOptions = {
      url: "http://13.232.56.9/api/v1/home/client?uuid=24956",
      body: { "method": "GET", "url": "/VIEWGROUPS" }
    }
    fetch(areaOptions.url, {
      method: "POST",
      body: JSON.stringify(areaOptions.body)
    }).then(res => {
      setTimeout(this.getAllAreas, 500)
    }).catch(error => {
      this.setState({
        areaList: []
      })
    })
  }

  getAllAreas = () => {
    const areaOptions = {
      url: "http://13.232.56.9/api/v1/home/client?uuid=24956"
    }
    fetch(areaOptions.url).then(response => response.json())
      .then(res => {
        this.setState({
          areaList: res.groups != undefined ? res.groups : []
        })
      }).catch(error => {
        this.setState({
          areaList: []
        })
      })

  }
  render() {

    const { navigation } = this.props;
    return (
      <Container style={{ backgroundColor: colors.lightWhite }}>
        <ScrollView>
          <Section title={"Areas"} data={this.state.areaList} />
        </ScrollView>
        <FloatingButton navigation={navigation} />
      </Container>
    );
  }
}
