import { Button, Container, Icon } from "native-base";
import React, { Component } from "react";
import { ActivityIndicator, Dimensions, FlatList, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { get, updateDeviceStatus, viewAllDevices, viewLiveDevices } from "../api/ApiService";
import { EmptySection } from "../components/EmptySection";
import FloatingButton from "../components/FloatingButton";
import { colors } from "../style/AppStyle";
import { toLowerCase, toUpperCase } from "../util/StringUtil";


export default class LiveScreen extends Component {
  static navigationOptions = {
    tabBarLabel: "DEVICES",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="home" size={25} color={colors.white} />
    )
  }

  state = {
    activePage: 1,
    activeDeviceList: [],
    allDeviceList: [],
    loading: true
  }

  componentDidMount() {
    this.postRequestForLiveDevices();
  }

  postRequestForLiveDevices = () => {
    viewLiveDevices().then(res => {
      console.debug(1)
      setTimeout(this.getLiveDevices, 5000)
    }).catch(error => {
      console.debug(2)
      this.setState({
        activeDeviceList: [],
        loading: false
      })
    })
  }

  getLiveDevices = () => {
    get().then(res => {
      console.debug(3)
      this.setState({
        activeDeviceList: res.devices != undefined ? res.devices : [],
        loading: false
      })
    }).catch(error => {
      this.setState({
        activeDeviceList: [],
        loading: false
      })
    })
  }

  postRequestForAllDevices = () => {
    viewAllDevices().then(res => {
      console.debug("posting all devices")
      setTimeout(this.getAllDevices, 5000)
    }).catch(error => {
      console.debug("posting failed")
      this.setState({
        allDeviceList: [],
        loading: false
      })
    })
  }

  getAllDevices = () => {
    get().then(res => {
      console.debug("Fetching results")
      this.setState({
        allDeviceList: res.devices != undefined ? res.devices : [],
        loading: false
      })
    }).catch(error => {
      console.debug("Fetching failed")

      this.setState({
        allDeviceList: [],
        loading: false
      })
    })
  }

  updateDeviceStatus(id, status) {

    let devices = [];
    if (this.state.activePage == 1) {
      devices = this.state.activeDeviceList;
    } else {
      devices = this.state.allDeviceList
    }

    for (var i = 0; i < devices.length; i++) {
      if (devices[i].id === id) {
        updateDeviceStatus(id, "SWITCH", status)
        devices[i].status = status
      }
    }
    this.setState({
      loading: true
    })
    if (this.state.activePage === 1) {
      this.postRequestForLiveDevices();
    } else {
      this.postRequestForAllDevices();
    }
  }

  selectComponent = (activePage) => () => {
    this.setState({ activePage, loading: true })
    console.debug(this.state.activePage)
    if (activePage === 1) {
      this.postRequestForLiveDevices();
    } else {
      this.postRequestForAllDevices();
    }
  }

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
            extraData={this.state}
          />
        )
      } else {
        return <EmptySection title='Devices' />
      }
    }
  }

  _listComponent = (item) => {
    let status = item.item.status;
    return (
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center", marginLeft: 20, marginRight: 20, minHeight: 80, marginBottom: 10, maxHeight: 80, backgroundColor: colors.white, borderBottomRightRadius: 8, borderTopRightRadius: 10 }}>
        <View style={{
          height: 80,
          width: 5,
          backgroundColor: colors.buttonColor
        }}>
        </View>
        <View >
          <Icon
            style={{ color: colors.buttonColor, marginLeft: 20, marginRight: 5, fontSize: 50 }}
            type="Octicons"
            name="device-mobile"
          />
        </View>
        {/* <View style={{
          height: 50,
          width: 2,
          backgroundColor: colors.white
        }}></View> */}
        <View style={{ flexDirection: "column", marginLeft: 20 }}>
          <Text style={{ color: colors.buttonColor, fontSize: 16, fontWeight: "300" }}>{toUpperCase(item.item.name)}</Text>
          <View style={{ flexDirection: "row", marginTop: 2 }}>
            <Text style={{ color: colors.white, fontSize: 14, color: "#A8A8A8" }}>{toLowerCase(item.item.type)}, </Text>
            <Text style={{ color: colors.white, fontSize: 14, color: "#A8A8A8", marginLeft: 5 }}>{toLowerCase(item.item.room)}</Text>
          </View>
        </View>
        <View style={{ position: "absolute", right: 20 }}>
          <Switch value={status === "ON" ? true : false} trackColor={{ true: "#A8A8A8", false: "#A8A8A8" }} thumbColor={colors.buttonColor}
            onValueChange={() => {
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
    return (
      <Container style={{ backgroundColor: colors.white }}>

        <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20, height: 50 }}>
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
        {
          this.state.loading ? <View style={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
          }}><ActivityIndicator size="large" color={colors.headerColor} /></View> :

            <ScrollView>
              {this._renderComponent()}
            </ScrollView>
        }

        {this.state.loading ? null : <FloatingButton navigation={navigation} />}
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