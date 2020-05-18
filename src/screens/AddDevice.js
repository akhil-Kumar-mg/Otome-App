import { Icon, Item, Picker } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, HelperText, Surface, TextInput } from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import { get, viewArea } from "../api/ApiService";
import { colors } from '../style/AppStyle';

export default class AddDevice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceType: "",
            channel: "",
            address: "",
            deviceName: "",
            invalidDeviceName: false,
            invalidAddress: false,
            invalidChannel: false
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: {
                backgroundColor: colors.headerColor
            },
            headerTintColor: colors.white,
            title: "Add Device Info",
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate("HOME")}>
                    <Text style={{ color: colors.white, fontSize: 16, marginRight: 15 }}>
                        Cancel
              </Text>
                </TouchableOpacity>
            )
        };
    };

    getAllAreas = () => {
        get().then(res => {
            this.setState({
                areaList: res.groups != undefined ? res.groups : []
            })
        }).catch(error => {
            this.setState({
                areaList: []
            })
        })
    }

    componentDidMount() {
        viewArea().then(res => {
            setTimeout(this.getAllAreas, 500)
        }).catch(error => {
            this.setState({
                areaList: []
            })
        })
    }

    _onDeviceNameChange = text => this.setState({ deviceName: text });
    _onAddressChange = text => this.setState({ address: text });
    _onChannelSelect = text => {
        if (parseInt(text) > 16) {
            Toast.show("Channel value should be less than 16")
            this.setState({
                channel: "",
                invalidChannel: true
            });
        } else {
            this.setState({
                channel: text,
                invalidChannel: false
            });
        }

    }
    onDeviceTypeSelect = (value) => {
        this.setState({
            deviceType: value
        });
    }
    handleNext = () => {
        if (this.state.deviceName.length == 0 || this.state.address.length == 0) {
            Toast.show("Please fill all the details")
            this.setState({
                invalidDeviceName: this.state.deviceName.length == 0 ? true : this.state.invalidDeviceName,
                invalidAddress: this.state.address.length == 0 ? true : this.state.address
            })
            return;
        }
        const { deviceName, address, channel, deviceType } = this.state;
        this.props.navigation.navigate("SEARCH_SCREEN", {
            deviceName,
            address,
            channel,
            deviceType
        })
    }

    render() {
        return (
            <Surface style={styles.container}>
                <ScrollView>
                    <TextInput
                        label="Device Name"
                        value={this.state.deviceName}
                        style={styles.deviceInp}
                        onChangeText={this._onDeviceNameChange}
                        selectionColor={colors.buttonColor}
                        mode="outlined"
                        theme={{ roundness: 10, colors: { text: colors.buttonColor, placeholder: colors.headerColor } }}
                    />
                    <HelperText
                        type="error"
                        style={{ marginLeft: 10 }}
                        visible={this.state.invalidDeviceName}
                    >
                        Device name can't be empty!
        </HelperText>
                    <TextInput
                        label="Unique Address"
                        value={this.state.address}
                        style={styles.deviceInp}
                        onChangeText={this._onAddressChange}
                        selectionColor={colors.buttonColor}
                        mode="outlined"
                        theme={{ roundness: 10, colors: { text: colors.buttonColor, placeholder: colors.headerColor } }}
                    />
                    <HelperText
                        type="error"
                        style={{ marginLeft: 10 }}
                        visible={this.state.invalidAddress}
                    >
                        Address can't be empty!
        </HelperText>

                    <View style={{ flexDirection: "row", justifyContent: "space-around", alignContent: "space-around" }}>
                        <View style={{ flex: 1, flexDirection: "column" }}>
                            <TextInput
                                label="Channel"
                                value={this.state.channel}
                                style={styles.deviceInp}
                                onChangeText={this._onChannelSelect}
                                selectionColor={colors.buttonColor}
                                mode="outlined"
                                keyboardType="numeric"
                                theme={{ roundness: 10, colors: { text: colors.buttonColor, placeholder: colors.headerColor } }}
                            />
                            {
                                this.state.invalidChannel ? <HelperText
                                    type="error"
                                    style={{ marginLeft: 10 }}
                                    visible={this.state.invalidChannel}
                                >
                                    Invalid Channel Entered!
        </HelperText> :
                                    <HelperText
                                        type="error"
                                        visible={!this.state.invalidChannel}
                                        style={{ color: colors.headerColor, marginLeft: 10 }}
                                    >
                                        Type in between 1-16
        </HelperText>
                            }


                        </View>
                        <View style={{ flex: 1, flexDirection: "column" }}>

                            <Item regular style={styles.inputBox}>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    placeholder="Select Device Type"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    style={{ color: colors.buttonColor }}
                                    itemStyle={{ height: 70 }}
                                    selectedValue={this.state.deviceType}
                                    onValueChange={this.onDeviceTypeSelect}
                                >
                                    {/* <Picker.Item label="" value="" color={colors.buttonColor} /> */}
                                    <Picker.Item label="SWITCH" value="SWITCH" color={colors.buttonColor} />
                                    <Picker.Item label="LIFX" value="LIFX" color={colors.buttonColor} />
                                    <Picker.Item label="RGB" value="RGB" color={colors.buttonColor} />
                                </Picker>
                            </Item>
                            <HelperText
                                type="error"
                                visible={!this.state.invalidChannel}
                                style={{ color: colors.headerColor, marginLeft: 10 }}
                            >
                                Select Device Type
                            </HelperText>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.saveArea}>
                    <Button
                        style={styles.saveBtn}
                        contentStyle={{ height: 60, minHeight: 60 }}
                        labelStyle={{ color: colors.white, fontSize: 18 }}
                        mode="contained"
                        onPress={this.handleNext}>
                        Next
          </Button>
                </View>
            </Surface>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryBG,
        elevation: 12
    },
    inputBox: {
        flex: 1,
        marginTop: 15,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 5,
        minHeight: 55,
        backgroundColor: colors.white,
        borderWidth: 3,
        borderRadius: 10,
        borderColor: colors.headerColor
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
    deviceInp: {
        paddingHorizontal: 20,
        marginTop: 10,
        backgroundColor: colors.white
    }
});