import { Button, Container, Content, Icon, Input, Item, Picker } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import Toast from 'react-native-simple-toast';
import { TextInput, Surface, HelperText } from 'react-native-paper';
import { addDevice, get, viewArea } from "../api/ApiService";
import { colors } from '../style/AppStyle';

export default class AddDevice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            areaName: "",
            deviceType: "SWITCH",
            channel: "",
            address: "",
            deviceName: "",
            areaList: []
        }
    }

    getAllAreas = () => {
        get().then(res => {
            this.setState({
                areaList: res.groups != undefined ? res.groups : []
            })
        }).catch(error => {
            this.setState({
                activeDeviceList: []
            })
        })
    }

    componentDidMount() {
        // this.setState({
        //     areaName: this.props.navigation.getParam('areaName')
        // });
        viewArea().then(res => {
            setTimeout(this.getAllAreas, 500)
        }).catch(error => {
            this.setState({
                areaList: []
            })
        })
    }

    _onChangeText = text => this.setState({ deviceName: text });

    _hasErrors = () => {
        return this.state.deviceName.length == 0 ? true : false;
    }

    handleInputChange = (item) => {
        this.setState({
            areaName: item.name
        })
    }

    // setDeviceName = (text) => {
    //     this.setState({
    //         deviceName: text
    //     })
    // }

    setAddress = (text) => {
        this.setState({
            address: text
        })
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

    onDeviceTypeSelect = (value) => {
        this.setState({
            deviceType: value
        });
    }


    onChannelSelect = (text) => {
        if (parseInt(text) > 16) {
            Toast.show("Channel value should be less than 16")
            text = "";
        }
        this.setState({
            channel: text
        });
    }

    handleSubmit = () => {
        if (this.state.deviceName.length == 0 || this.state.address.length == 0 || this.state.areaName == undefined) {
            Toast.show("Please fill all the details")
            return;
        }
        const { areaName, deviceName, address, channel, deviceType } = this.state;
        addDevice(areaName, deviceName, address, channel, deviceType).then(res => {
            Toast.show("Added device")
        }).catch(error => {
            Toast.show("Adding device failed")
        })
    }

    render() {
        return (
            <Surface style={styles.container}>
                <TextInput
                    label="Device Name"
                    value={this.state.deviceName}
                    style={styles.deviceInp}
                    onChangeText={this._onChangeText}
                    selectionColor={colors.buttonColor}
                    mode="outlined"
                    theme={{ roundness: 10, colors: { text: colors.buttonColor, placeholder: colors.headerColor } }}
                />
                <HelperText
                    type="error"
                    style={{ marginLeft: 10 }}
                    visible={this._hasErrors()}
                >
                    Device name can't be empty!
        </HelperText>
                <TextInput
                    label="Unique Address"
                    value={this.state.address}
                    style={styles.deviceInp}
                    onChangeText={this._onChangeText}
                    selectionColor={colors.buttonColor}
                    mode="outlined"
                    theme={{ roundness: 10, colors: { text: colors.buttonColor, placeholder: colors.headerColor } }}
                />
                <HelperText
                    type="error"
                    style={{ marginLeft: 10 }}
                    visible={this._hasErrors()}
                >
                    Device name can't be empty!
        </HelperText>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignContent: "center" }}>
                    <View style={{ flex: 1, flexDirection: "column", width: "40%" }}>
                        <TextInput
                            label="Unique Address"
                            value={this.state.address}
                            style={styles.deviceInp}
                            onChangeText={this._onChangeText}
                            selectionColor={colors.buttonColor}
                            mode="outlined"
                            placeholder="jgjg"
                            theme={{ roundness: 10, colors: { text: colors.buttonColor, placeholder: colors.headerColor } }}
                        />
                        <HelperText
                            type="error"
                            style={{ marginLeft: 10 }}
                            visible={this._hasErrors()}
                        >
                            Device name can't be empty!
        </HelperText>
                        <Text style={{ marginTop: 3, marginLeft: 30, color: colors.buttonColor }}>Type in between 1-16</Text>
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
                                on
                                selectedValue={this.state.deviceType}
                                onValueChange={this.onDeviceTypeSelect}
                            >
                                {/* <Picker.Item label="" value="" color={colors.buttonColor} /> */}
                                <Picker.Item label="SWITCH" value="SWITCH" color={colors.buttonColor} />
                                <Picker.Item label="LIFX" value="LIFX" color={colors.buttonColor} />
                                <Picker.Item label="RGB" value="RGB" color={colors.buttonColor} />
                            </Picker>
                        </Item>
                        <Text style={{ marginTop: 3, marginLeft: 30, color: colors.buttonColor }}>Device Type</Text>
                    </View>
                </View>
            </Surface>
            //</Surface>/ // <Surface style={styles.container}>
            //     <Content>
            //         {/* <View>
            //             <Text style={styles.heading}>Device Info</Text>
            //         </View> */}
            //         <Item regular style={styles.inputBox}>
            //             {/* <Input
            //                 value={this.state.areaName}
            //                 style={{ fontSize: 14, marginLeft: 5 }}
            //                 placeholder="Area name"
            //                 placeholderTextColor={colors.buttonColor}
            //                 onChangeText={this.handleInputChange}
            //             /> */}

            //             <SearchableDropdown
            //                 onTextChange={text => this.handleInputChange(text)}
            //                 onItemSelect={item => this.handleInputChange(item)}
            //                 containerStyle={{ flex: 1 }}
            //                 textInputStyle={{
            //                     padding: 12,
            //                     color: colors.buttonColor,
            //                     // borderWidth: 1,
            //                     // borderColor: '#ccc',
            //                     borderRadius: 5,
            //                     fontSize: 14
            //                 }}
            //                 itemStyle={{
            //                     padding: 10,
            //                     marginTop: 2,
            //                     borderColor: '#bbb',
            //                     borderWidth: 1,
            //                     borderRadius: 5,
            //                     fontSize: 14
            //                 }}
            //                 itemTextStyle={{ color: colors.buttonColor, fontSize: 14 }}
            //                 itemsContainerStyle={{ maxHeight: 140 }}
            //                 items={this.state.areaList}
            //                 placeholder="Select an area"
            //                 placeholderTextColor={colors.buttonColor}
            //                 resetValue={false}
            //                 underlineColorAndroid="transparent"
            //             />
            //         </Item>
            //         <Item regular style={styles.inputBox}>
            //             <Input
            //                 style={{ fontSize: 14, marginLeft: 5, color: colors.buttonColor }}
            //                 placeholder="Device name"
            //                 placeholderTextColor={colors.buttonColor}
            //                 value={this.state.deviceName}
            //                 onChangeText={this.setDeviceName}
            //             />
            //         </Item>
            //         <Item regular style={styles.inputBox}>
            //             <Input
            //                 style={{ fontSize: 14, marginLeft: 5, color: colors.buttonColor }}
            //                 placeholder="Unique Address"
            //                 placeholderTextColor={colors.buttonColor}
            //                 value={this.state.address}
            //                 onChangeText={this.setAddress}
            //             />
            //         </Item>

            //         <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignContent: "center" }}>
            //             <View style={{ flex: 1, flexDirection: "column", width: "40%" }}>
            //                 <Item regular style={styles.inputBox}>
            //                     <Input
            //                         style={{ fontSize: 14, marginLeft: 5, color: colors.buttonColor }}
            //                         placeholder="Channel"
            //                         placeholderTextColor={colors.buttonColor}
            //                         onChangeText={this.onChannelSelect}
            //                         keyboardType="numeric"
            //                         value={this.state.channel}
            //                         maxLength={2}
            //                     />
            //                 </Item>
            //                 <Text style={{ marginTop: 3, marginLeft: 30, color: colors.buttonColor }}>Type in between 1-16</Text>
            //             </View>
            //             <View style={{ flex: 1, flexDirection: "column" }}>
            //                 <Item regular style={styles.inputBox}>
            //                     <Picker
            //                         mode="dropdown"
            //                         iosIcon={<Icon name="arrow-down" />}
            //                         placeholder="Select Device Type"
            //                         placeholderStyle={{ color: "#bfc6ea" }}
            //                         placeholderIconColor="#007aff"
            //                         style={{ color: colors.buttonColor }}
            //                         itemStyle={{ height: 70 }}
            //                         on
            //                         selectedValue={this.state.deviceType}
            //                         onValueChange={this.onDeviceTypeSelect}
            //                     >
            //                         {/* <Picker.Item label="" value="" color={colors.buttonColor} /> */}
            //                         <Picker.Item label="SWITCH" value="SWITCH" color={colors.buttonColor} />
            //                         <Picker.Item label="LIFX" value="LIFX" color={colors.buttonColor} />
            //                         <Picker.Item label="RGB" value="RGB" color={colors.buttonColor} />
            //                     </Picker>
            //                 </Item>
            //                 <Text style={{ marginTop: 3, marginLeft: 30, color: colors.buttonColor }}>Device Type</Text>
            //             </View>
            //         </View>
            //     </Content>
            //     <Button
            //         block
            //         style={styles.nextButton}
            //         onPress={this.handleSubmit}
            //     >
            //         <Text style={{ color: colors.white, fontSize: 20 }}>Save</Text>
            //     </Button>
            // </Surface>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryBG,
        elevation: 12
    },
    heading: {
        flex: 1,
        color: colors.buttonColor,
        marginTop: 50,
        marginLeft: 20,
        fontSize: 25,
        fontWeight: "400"
    },
    inputBox: {
        flex: 1,
        marginTop: 15,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 5,
        minHeight: 60,
        backgroundColor: colors.white
    },
    nextButton: {
        minHeight: 60,
        backgroundColor: colors.headerColor
    },
    deviceInp: {
        paddingHorizontal: 20,
        marginTop: 20
    }
});