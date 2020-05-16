import { Icon, Switch } from "native-base";
import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../style/AppStyle";
import { toUpperCase, toLowerCase } from '../util/StringUtil';

export default class AreaDetail extends Component {
    state = {
        expand: true,
        deviceList: []
    }

    componentDidMount() {
        const options = {
            url: "http://13.232.56.9/api/v1/home/client?uuid=24956",
            body: { "method": "GET", "url": "/VIEWGROUP", "query": { "g": this.props.name } }
        }
        fetch(options.url, {
            method: "POST",
            body: JSON.stringify(options.body)
        }).then(res => {
            setTimeout(this.getDeviceList, 1000)
        }).catch(error => {
            this.setState({
                deviceList: []
            })
        })
    }

    getDeviceList = () => {
        const options = {
            url: "http://13.232.56.9/api/v1/home/client?uuid=24956"
        }
        fetch(options.url).then(response => response.json())
            .then(res => {
                this.setState({
                    deviceList: res.devices
                })
            }).catch(error => {
                this.setState({
                    deviceList: []
                })
            })
    }

    _handleExpand = () => {
        this.setState({
            expand: !this.state.expand
        })
    }

    render() {
        return (
            <View style={{ marginBottom: 15, marginTop: 15 }}>
                <TouchableOpacity onPress={this._handleExpand} activeOpacity={.9} style={{ height: 60, marginLeft: 10, marginRight: 10 }}>
                    <View style={{
                        flex: 1, flexDirection: "row", backgroundColor: colors.buttonColor, borderWidth: 2, borderColor: colors.buttonColor,
                        borderRadius: 10
                    }}>

                        <Text style={styles.itemTitle}> {this.props.name}</Text>
                        <Icon
                            style={styles.titleIcon}
                            type="Entypo"
                            name={this.state.expand ? "chevron-small-down" : "chevron-small-right"}
                        />
                    </View>
                </TouchableOpacity>


                {this.state.expand ? <View style={{ flexDirection: "row", justifyContent: "center", alignContent: "center", height: 50 }}>
                    {this.state.deviceList.length == 0 ?
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ color: colors.buttonColor, fontSize: 16, fontWeight: "600", flex: 1 }}>
                                No Devices Found
                        </Text>
                        </View> :
                        <FlatList
                            data={this.state.deviceList}
                            renderItem={({ item }) => <Device item={item} />}
                            keyExtractor={item => item.id}
                        />
                    }
                </View>
                    : null}
            </View >
        );
    }
}

const Device = item => {
    let status = item.item.value;
    return (
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", marginLeft: 15, marginRight: 20, minHeight: 80, marginBottom: 5, maxHeight: 80, backgroundColor: colors.white, borderBottomRightRadius: 8, borderTopRightRadius: 10 }}>
            <View >
                <Icon
                    style={{ color: colors.buttonColor, marginLeft: 20, marginRight: 5, fontSize: 50 }}
                    type="Octicons"
                    name="device-mobile"
                />
            </View>

            <View style={{ marginLeft: 20 }}>
                <Text style={{ color: colors.buttonColor, fontSize: 16, fontWeight: "300" }}>{toUpperCase(item.item.name)}</Text>
            </View>
            <View style={{ position: "absolute", right: 20 }}>
                <Switch disabled value={status === "ON" ? true : false} trackColor={{ true: "#A8A8A8", false: "#A8A8A8" }} thumbColor={colors.buttonColor}
                />
                <Text style={{ color: colors.buttonColor, fontWeight: "500", marginTop: 5, fontSize: 12, marginLeft: 5 }}>{status}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    itemTitle: {
        marginLeft: 10,
        marginTop: 15,
        fontSize: 16,
        fontWeight: "500",
        color: colors.white
    },
    titleIcon: {
        position: "absolute",
        top: 0,
        right: 0,
        color: "#E9E9E9",
        marginRight: 10,
        marginTop: 10,
        backgroundColor: "transparent"
    },
    deviceName: {
        color: colors.buttonColor,
        fontWeight: "bold",
        // backgroundColor: "#9CC3D5",
        fontSize: 14,
        marginLeft: 40,
        marginTop: 20
    },
    deviceStatus: {
        position: "absolute",
        right: 0,
        marginTop: 20,
        marginRight: 20,
        fontWeight: "600"
    }
});
