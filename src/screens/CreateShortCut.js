import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { Button, HelperText, List, Surface, TextInput } from 'react-native-paper';
import { get, viewArea } from '../api/ApiService';
import { colors } from "../style/AppStyle";

export default class CreateShortCut extends Component {

  state = {
    shortCutName: '',
    groupList: [],
    groupSetting: {},
    apiCallingArea: ''
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: colors.headerColor
      },
      title: "Create a Shortcut",
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

  componentDidMount() {
    viewArea().then(res => {
      setTimeout(this.getAllAreas, 3000)
    }).catch(error => {
      this.setState({
        groupList: []
      })
    })
  }
  getAllAreas = () => {
    get().then(res => {
      const groups = res.groups;
      if (groups != undefined) {
        const temp = Object.assign({}, this.state.groupSetting);
        for (let i = 0; i < groups.length; i++) {
          if (this.state.groupSetting[groups[i].name] == undefined) {
            temp[groups[i].name] = { "expanded": false, "devices": [], apiCalled: false }
          }
        }
        this.setState({
          groupSetting: temp,
          groupList: res.groups != undefined ? res.groups : []
        })
      }
    }).catch(error => {
      this.setState({
        groupList: []
      })
    })
  }
  _onChangeText = text => this.setState({ shortCutName: text });

  _hasErrors = () => {
    return this.state.shortCutName.length == 0 ? true : false;
  }

  getArea = () => {
    get().then(res => {
      const devices = res.devices;
      console.debug(devices)
      if (devices != undefined) {
        let temp = Object.assign({}, this.state.groupSetting);
        temp[this.state.apiCallingArea].devices = devices
        this.setState({
          groupSetting: temp
        })
      }
    }).catch(error => {
      let temp = Object.assign({}, this.state.groupSetting);
      temp[this.state.apiCallingArea].devices = [];
      this.setState({
        groupSetting: temp
      })
    })
  }

  render() {
    const { navigation } = this.props
    console.debug(this.state)
    return (
      <Surface style={styles.container}>
        <View style={styles.area}>
          <View style={styles.inputBox}>
            <TextInput
              label="Shortcut Name"
              value={this.state.shortCutName}
              style={styles.textArea}
              onChangeText={this._onChangeText}
              selectionColor={colors.buttonColor}
              mode="outlined"
              theme={{ roundness: 10, colors: { text: colors.buttonColor, placeholder: colors.headerColor } }}
            />
            <HelperText
              type="error"
              visible={this._hasErrors()}
            >
              Shortcut name can't be empty!
        </HelperText>
            {/* <ScrollView style={{ marginTop: 20 }}> */}
            <List.Section title="Available Groups">
              <FlatList
                extraData={this.state}
                data={this.state.groupList}
                keyExtractor={item => item.name}
                renderItem={({ item }) => {
                  return (<List.Accordion
                    title={item.name}
                    expanded={this.state.groupSetting[item.name].expanded}
                    onPress={() => {
                      if (this.state.groupSetting[item.name].apiCalled) return;
                      let temp = Object.assign({}, this.state.groupSetting);
                      temp[item.name].expanded = !this.state.groupSetting[item.name].expanded
                      this.setState({
                        groupSetting: temp,
                        apiCallingArea: item.name
                      })
                      viewArea(item.name).then(res => {
                        setTimeout(this.getArea, 3000)
                      }).catch(error => {
                        let temp = Object.assign({}, this.state.groupSetting);
                        temp[this.state.apiCallingArea].devices = [];
                        this.setState({
                          groupSetting: temp
                        })
                      })
                    }}
                    style={{ padding: 0 }}
                    left={props => <List.Icon {...props} icon="folder"
                    />}
                  >
                    <FlatList
                      data={DATA}
                      renderItem={({ item }) => {
                        return (
                          <View>
                            <Text>{item.name}</Text>
                          </View>
                        )
                      }}
                      keyExtractor={item => item.id}
                    />
                  </List.Accordion>)

                }} />
            </List.Section>
            {/* </ScrollView> */}
          </View>
        </View>
        {/* <View style={styles.saveArea}>
          <Button
            style={styles.saveBtn}
            contentStyle={{ height: 60, minHeight: 60 }}
            labelStyle={{ color: colors.white, fontSize: 18 }}
            mode="contained"
            onPress={() => console.log('Pressed')}>
            Save
          </Button>
        </View> */}

      </Surface>
    );
  }
}
const DATA = [{ "id": "379", "type": "SWITCH", "name": "SWITCH3", "status": "OFF", "icon": "6" }, { "id": "380", "type": "SWITCH", "name": "SWITCH4", "status": "OFF", "icon": "1" }, { "id": "382", "type": "LIFX", "name": "LIFX", "status": "OFF", "icon": "10" }, { "id": "455", "type": "LIFX", "name": "NEW", "status": "OFF", "icon": "icon" }, { "id": "456", "type": "SWITCH", "name": "Test", "status": "OFF", "icon": "icon" }, { "id": "457", "type": "SWITCH", "name": "Test", "status": "OFF", "icon": "icon" }, { "id": "458", "type": "SWITCH", "name": "Test", "status": "OFF", "icon": "icon" }, { "id": "459", "type": "LIFX", "name": "Test", "status": "OFF", "icon": "icon" }, { "id": "460", "type": "LIFX", "name": "NEW", "status": "OFF", "icon": "icon" }, { "id": "461", "type": "SWITCH", "name": "NEW", "status": "OFF", "icon": "icon" }, { "id": "462", "type": "LIFX", "name": "Test7", "status": "OFF", "icon": "icon" }]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    elevation: 12
  },
  inputBox: {
    backgroundColor: colors.white,
    marginLeft: 20,
    marginRight: 20
  },
  area: {
    color: colors.white,
    marginTop: 15
  },
  saveArea: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: colors.white
  },
  textArea: {
    height: 60,
    backgroundColor: colors.white,
  },
  saveBtn: {
    flex: 1,
    backgroundColor: colors.headerColor
  }
});
