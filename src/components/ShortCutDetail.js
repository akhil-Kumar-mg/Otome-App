import { Icon, Switch } from "native-base";
import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View, ActivityIndicator, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../style/AppStyle";
import { withNavigation } from "react-navigation";
import { Drawer, Button } from 'react-native-paper';
import { toUpperCase } from '../util/StringUtil'

class ShortCutDetail extends Component {

    componentDidMount() {
        const ShortCutOption = {
            url: "http://13.232.56.9/api/v1/home/client?uuid=24956",
            body: { "method": "GET", "url": "/VIEWSCENE", "query": { "id": this.props.id } }
        }
        fetch(ShortCutOption.url, {
            method: "POST",
            body: JSON.stringify(ShortCutOption.body)
        }).then(res => {
            setTimeout(this.getSceneDetails, 2000)
        }).catch(error => {
            this.setState({
                sceneDetail: {},
                loading: false
            })
        })
    }

    setShortCutDetails = (items) => {
        var map = {}, groups = [];
        for (var i = 0; i < items.length; i++) {
            if (map[items[i].group] != undefined) {
                map[items[i].group].devices.push(items[i]);
            } else {
                map[items[i].group] = { "devices": [items[i]] };
                groups.push({
                    "id": items[i].id,
                    "title": items[i].group
                });
            }
        }
        this.setState({
            groups,
            sceneDetail: map,
            loading: false
        })
    }

    getSceneDetails = () => {
        const sceneDetailOption = {
            url: "http://13.232.56.9/api/v1/home/client?uuid=24956"
        }
        fetch(sceneDetailOption.url).then(response => response.json())
            .then(res => {
                this.setShortCutDetails(res.scene_details);
            }).catch(error => {
                this.setState({
                    sceneDetail: {},
                    loading: false
                })
            })
    }
    state = {
        groups: [],
        sceneDetail: {},
        loading: true
    }
    render() {
        const { navigation } = this.props;
        return (
            <View>
                <View style={{ flexDirection: "row", justifyContent: "center", alignContent: "center", marginTop: 15, marginBottom: 10 }}>

                    <View style={{
                        flex: 1, alignContent: "center", justifyContent: "center"
                    }}>
                        <Button icon="eye" mode="text" labelStyle={{ fontSize: 13 }}
                            onPress={() => navigation.navigate("VIEW_SCHEDULES", {
                                "id": this.props.id,
                                "name": this.props.name
                            })}>
                            View Schedules
                        </Button>
                    </View>
                </View>
                <View
                    style={{
                        borderBottomColor: colors.white,
                        borderBottomWidth: 3,
                    }}
                />
                <View style={{ marginBottom: 15 }}>
                    {
                        this.state.loading ? <ActivityIndicator size="large" color={colors.headerColor} /> :
                            <FlatList
                                data={this.state.groups}
                                renderItem={({ item }) => <DeviceList title={item.title} devices={this.state.sceneDetail[item.title].devices} />}
                                keyExtractor={item => item.id}
                            />
                    }
                </View>
            </View>
        );
    }
}

export default withNavigation(ShortCutDetail);

class
    DeviceList extends Component {
    state = {
        expand: false
    }

    _handleExpand = () => {
        this.setState({
            expand: !this.state.expand
        })
    }

    render() {
        return (
            <View style={{ marginBottom: 15, marginTop: 15 }}>
                <TouchableOpacity onPress={this._handleExpand} activeOpacity={.9}>
                    <View style={{
                        flex: 1, flexDirection: "row", height: 60, backgroundColor: colors.buttonColor, borderWidth: 2, borderColor: colors.buttonColor,
                        borderRadius: 10, marginLeft: 10, marginRight: 10
                    }}>
                        <Text style={styles.itemTitle}>{toUpperCase(this.props.title)}</Text>
                        <Icon
                            style={styles.titleIcon}
                            type="Entypo"
                            name={this.state.expand ? "chevron-small-down" : "chevron-small-right"}
                        />
                    </View>
                </TouchableOpacity>
                {this.state.expand ? <View style={{ marginTop: 5 }}>
                    <FlatList
                        data={this.props.devices}
                        renderItem={({ item }) => <Device item={item} />}
                        keyExtractor={item => item.id}
                    />
                </View> : null}

            </View>
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
        marginLeft: 20,
        marginTop: 15,
        fontSize: 16,
        fontWeight: "500",
        color: colors.white
    },
    scheduleTxt: {
        marginTop: 10,
        fontSize: 15,
        color: "#E9E9E9"
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
    },
    dayON: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 15,
        marginTop: 15,
        backgroundColor: colors.headerColor,
        borderRadius: 10,
        borderColor: colors.headerColor,
        borderWidth: 1,
        width: 30,
        height: 30,
        marginRight: 10,
        marginLeft: 10,
        alignItems: "center",
        justifyContent: "center"

    },
    dayOFF: {
        color: colors.headerColor,
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 15,
        marginTop: 15,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.buttonColor,
        borderRadius: 10,
        width: 30,
        height: 30,
        marginRight: 10,
        marginLeft: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    viewScheduleBtn: {
        backgroundColor: "transparent"
    }
});
