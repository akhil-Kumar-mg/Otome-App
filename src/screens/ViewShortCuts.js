import { Button } from 'native-base';
import React, { Component } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { withNavigation } from "react-navigation";
import { colors } from "../style/AppStyle";

class ViewShortCut extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: {
                backgroundColor: colors.headerColor
            },
            headerTintColor: colors.white,
            title: "View Schedules"
        };
    };

    componentDidMount() {

    }

    render() {
        const DATA = [
            {
                id: "sd"
            }, {
                id: "d"
            }, {
                id: "dd"
            }
        ]
        const { navigation } = this.props;
        return (
            <View style={{ backgroundColor: colors.lightWhite }}>
                <View>
                    <Button
                        style={styles.addScheduleBtn}
                        onPress={() => navigation.navigate("SCHEDULER")}
                    >
                        <Text style={{ color: colors.white, fontSize: 20, fontWeight: "400" }}>Add a Schedule</Text>
                    </Button>
                </View>
                <ScrollView >
                    <FlatList
                        data={DATA}
                        renderItem={({ item }) => <TimeSchedule />}
                        keyExtractor={item => item.id}
                    />
                    <FlatList
                        data={DATA}
                        renderItem={({ item }) => <DayOrIntervalSchedule />}
                        keyExtractor={item => item.id}
                    />
                    <FlatList
                        data={DATA}
                        renderItem={({ item }) => <DayOrIntervalSchedule />}
                        keyExtractor={item => item.id}
                    />
                </ScrollView >
            </View>

        )
    }
}
export default withNavigation(ViewShortCut);

const TimeSchedule = () => {
    return (
        <View style={{
            flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start",
            marginTop: 10, borderWidth: 1,
            backgroundColor: colors.white,
            borderColor: colors.buttonColor, borderRadius: 10, margin: 10
        }}>
            <Text
                style={{
                    color: colors.buttonColor,
                    fontWeight: "600",
                    fontSize: 18,
                    marginTop: 15,
                    right: 15,
                    position: "absolute"
                }}
            >
                12:00 PM
    </Text>
            <View style={{
                marginLeft: 10,
                marginTop: 5
            }}>
                <Text>Akhil Kumar</Text>
            </View>
            <View
                style={{ flexDirection: "row", marginLeft: 10, marginBottom: 10 }}
            >
                <View >
                    <Text style={{
                        color: colors.buttonColor, fontSize: 18, marginTop: 5,
                        fontWeight: "500"
                    }}>12th April, 2020</Text>
                </View>
            </View>
        </View>
    )
}

const DayOrIntervalSchedule = () => {
    return (
        <View style={{
            flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start",
            marginTop: 10, borderWidth: 1,
            backgroundColor: colors.white,
            borderColor: colors.buttonColor, borderRadius: 10, margin: 10
        }}>
            <Text
                style={{
                    color: colors.buttonColor,
                    fontWeight: "600",
                    fontSize: 18,
                    marginTop: 15,
                    right: 15,
                    position: "absolute"
                }}
            >
                12:00 PM
    </Text>
            <View style={{
                marginLeft: 10,
                marginTop: 5
            }}>
                <Text>Akhil Kumar</Text>
            </View>
            <View
                style={{ flexDirection: "row", marginLeft: 10, marginBottom: 10 }}
            >
                <View style={styles.dayON}>
                    <Text style={{ color: colors.white }}>M</Text>
                </View>
                <View style={styles.dayOFF}>
                    <Text style={{ color: colors.buttonColor }}>T</Text>
                </View>
                <View style={styles.dayOFF}>
                    <Text style={{ color: colors.buttonColor }}>W</Text>
                </View>
                <View style={styles.dayON}>
                    <Text style={{ color: colors.white }}>T</Text>
                </View>
                <View style={styles.dayOFF}>
                    <Text style={{ color: colors.buttonColor }}>S</Text>
                </View>
                <View style={styles.dayON}>
                    <Text style={{ color: colors.white }}>S</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    dayON: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "600",
        marginRight: 10,
        marginTop: 15,
        backgroundColor: colors.headerColor,
        borderRadius: 10,
        borderColor: colors.headerColor,
        borderWidth: 1,
        width: 25,
        height: 25,
        alignItems: "center",
        justifyContent: "center"

    },
    dayOFF: {
        color: colors.headerColor,
        fontSize: 16,
        fontWeight: "600",
        marginRight: 10,
        marginTop: 15,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.buttonColor,
        borderRadius: 10,
        width: 25,
        height: 25,
        alignItems: "center",
        justifyContent: "center"
    },
    addScheduleBtn: {
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
