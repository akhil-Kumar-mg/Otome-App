import { Button, Container, Icon, Switch } from "native-base";
import React, { Component } from "react";
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { get, viewLiveDevices, updateDeviceStatus } from "../api/ApiService";
import { EmptySection } from "../components/EmptySection";
import FloatingButton from "../components/FloatingButton";
import { colors } from "../style/AppStyle";
import { toTitleCase, toLowerCase, toUpperCase } from "../util/StringUtil";

export default class LiveScreen extends Component {
  static navigationOptions = {
    tabBarLabel: "Devices",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="home" size={25} color={colors.white} />
    )
  }

  state = {
    activePage: 1,
    activeDeviceList: [],
    allDeviceList: []
  }

  getAllLiveDevices = () => {
    get().then(res => {
      this.setState({
        activeDeviceList: res.devices != undefined ? res.devices : []
      })
    }).catch(error => {
      this.setState({
        activeDeviceList: []
      })
    })
  }

  componentDidMount() {
    viewLiveDevices().then(res => {
      setTimeout(this.getAllLiveDevices, 1000)
    }).catch(error => {
      this.setState({
        activeDeviceList: []
      })
    })
  }

  updateDeviceStatus(id, status) {
    let devices = this.state.activeDeviceList;

    for (var i = 0; i < devices.length; i++) {
      if (devices[i].id === id) {
        updateDeviceStatus(id, "SWITCH", status)
        devices[i].status = status
      }
    }
    this.setState({
      activeDeviceList: devices
    })
  }

  selectComponent = (activePage) => () => this.setState({ activePage })

  _renderComponent = () => {
    if (this.state.activePage === 1) {
      if (this.state.activeDeviceList.length) {
        return (
          <FlatList
            data={this.state.activeDeviceList}
            renderItem={({ item }) => <this._listComponent item={item} />}
            keyExtractor={item => item.id}
            extraData={this.state}
          />
        )
      } else {
        return <EmptySection title='Live Devices' />
      }
    } else {
      if (this.state.allDeviceList.length) {
        return (
          <FlatList
            data={this.state.allDeviceList}
            renderItem={({ item }) => <this._listComponent item={item} />}
            keyExtractor={item => item.id}
          />
        )
      } else {
        return <EmptySection title='Devices' />
      }
    }
  }

  _listComponent = (item) => {
    let status = item.item.status;
    console.debug(status)
    return (
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center", marginLeft: 20, marginRight: 20, minHeight: 80, marginBottom: 20, maxHeight: 80, backgroundColor: "#4EA5D2", borderBottomRightRadius: 8, borderTopRightRadius: 10 }}>
        <View style={{
          height: 80,
          width: 5,
          backgroundColor: "#5A5388"
        }}>
        </View>
        <View >
          <Icon
            style={{ color: colors.white, marginLeft: 20, marginRight: 20, fontSize: 50 }}
            type="Octicons"
            name="device-mobile"
          />
        </View>
        <View style={{
          height: 50,
          width: 2,
          backgroundColor: colors.white
        }}></View>
        <View style={{ flexDirection: "column", marginLeft: 30 }}>
          <Text style={{ color: colors.white, fontSize: 18, fontWeight: "500" }}>{toUpperCase(item.item.name)}</Text>
          <View style={{ flexDirection: "row", marginTop: 2 }}>
            <Text style={{ color: colors.white, fontSize: 14, color: "yellow" }}>{toLowerCase(item.item.type)}, </Text>
            <Text style={{ color: colors.white, fontSize: 14, color: "yellow", marginLeft: 5 }}>{toLowerCase(item.item.room)}</Text>
          </View>
        </View>
        <View style={{ position: "absolute", right: 20 }}>
          <Switch value={status === "ON" ? true : false} trackColor={{ true: colors.yellow, false: colors.white }} onValueChange={() => {
            if (status == "ON") {
              status = "OFF"
            } else {
              status = "ON"
            }
            this.updateDeviceStatus(item.item.id, status)
          }
          } />
        </View>
      </View>
    )
  }

  render() {
    const { navigation } = this.props;
    console.debug(this.state.activeDeviceList)
    return (
      <Container style={{ backgroundColor: colors.lightWhite }}>
        <ScrollView>
          <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around", marginTop: 20, backgroundColor: colors.primaryBG }}>
            <Button
              style={this.state.activePage === 1 ? styles.activeTab : styles.inActiveTab}
              onPress={this.selectComponent(1)}><Text style={this.state.activePage === 1 ? styles.activeTabTxt : styles.inActiveTabTxt}>Live</Text></Button>
            <Button
              style={this.state.activePage === 2 ? styles.activeTab : styles.inActiveTab}
              onPress={this.selectComponent(2)}><Text style={this.state.activePage === 2 ? styles.activeTabTxt : styles.inActiveTabTxt}>All</Text></Button>
          </View>
          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              borderBottomColor: colors.white,
              borderBottomWidth: 4
            }}
          />
          {this._renderComponent()}
        </ScrollView>
        <FloatingButton navigation={navigation} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  inActiveTab: {
    backgroundColor: colors.primaryBG,
    height: 40,
    width: Dimensions.get("window").width / 2.4,
    borderWidth: 2,
    borderColor: colors.buttonColor,
    borderRadius: 5,
    justifyContent: "center"
  },
  activeTab: {
    backgroundColor: colors.buttonColor,
    height: 40,
    width: Dimensions.get("window").width / 2.4,
    borderWidth: 2,
    borderColor: colors.buttonColor,
    borderRadius: 5,
    justifyContent: "center"
  },
  activeTabTxt: {
    fontSize: 15,
    color: colors.white
  },
  inActiveTabTxt: {
    fontSize: 15,
    color: colors.buttonColor
  }
})