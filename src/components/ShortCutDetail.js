import { Icon, Switch, Button } from "native-base";
import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../style/AppStyle";
import { withNavigation } from "react-navigation";

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
            setTimeout(this.getSceneDetails, 1000)
        }).catch(error => {
            this.setState({
                sceneDetail: {}
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
            sceneDetail: map
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
                    sceneDetail: {}
                })
            })
    }
    state = {
        sceneDetail: {}
    }
    render() {
        const { navigation } = this.props;
        console.debug(navigation)
        return (
            <View>
                <View >
                    <View>
                        <Button
                            style={styles.viewScheduleBtn}
                            onPress={() => navigation.navigate("VIEW_SCHEDULES")}
                        >
                            <Text style={{ color: colors.white, fontSize: 20, fontWeight: "400" }}>View Schedules</Text>
                        </Button>
                    </View>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <FlatList
                        data={this.state.groups}
                        renderItem={({ item }) => <ShortCut title={item.title} devices={this.state.sceneDetail[item.title].devices} />}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        );
    }
}

export default withNavigation(ShortCutDetail);

class ShortCut extends Component {
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
                        <Text style={styles.itemTitle}>{this.props.title}</Text>
                        <Icon
                            style={styles.titleIcon}
                            type="Entypo"
                            name={this.state.expand ? "chevron-small-down" : "chevron-small-right"}
                        />
                    </View>
                </TouchableOpacity>
                {this.state.expand ? <View>
                    <FlatList
                        data={this.props.devices}
                        renderItem={({ item }) => <ShortCutItem item={item} />}
                        keyExtractor={item => item.id}
                    />
                </View> : null}

            </View>
        );
    }
}

const ShortCutItem = item => {
    console.debug(item)
    return (
        <View style={{
            flex: 1, flexDirection: "row",
            marginLeft: 20, marginRight: 15
        }}>
            <Text style={styles.deviceName}>{item.item.name}</Text>
            <Switch value={item.item.value} style={styles.deviceStatus} />
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
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: colors.buttonColor,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "center"
    }
});
