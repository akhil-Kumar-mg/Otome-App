import React, { Component } from 'react';
import { Button, Container, Content, Icon, Item, Input } from "native-base";
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { colors } from '../style/AppStyle';
import { ScrollView } from 'react-native-gesture-handler';

class ViewSchedules extends Component {
    state = {
        dateFilterSelected: true,
        daysFilterSelected: false,
        intervalFilterSelected: false,
        dateScheduleList: [],
        daysScheduleList: [],
        intervalScheduleList: []
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: "View Schedules",
            headerStyle: {
                backgroundColor: colors.headerColor,
            },
            headerTintColor: colors.white
        };
    };

    render() {
        return (
            <View style={{ backgroundColor: colors.primaryBG, flex: 1, flexDirection: "column" }}>
                <View style={{
                    marginTop: 15,
                    flex: .08,
                    flexDirection: "row",
                    colors: colors.buttonColor,
                    backgroundColor: colors.primaryBG,
                    justifyContent: "center",
                    alignContent: "center",
                }}>
                    <Button
                        style={this.state.dateFilterSelected ? styles.activeTabBtn : styles.inactiveTabBtn}
                        onPress={() => this.setState({
                            dateFilterSelected: true,
                            daysFilterSelected: false,
                            intervalFilterSelected: false
                        })}
                    >
                        <Text style={this.state.dateFilterSelected ? styles.activeTabTxt : styles.inactiveTabTxt}>Date</Text>
                    </Button>
                    <Button
                        style={this.state.daysFilterSelected ? styles.activeTabBtn : styles.inactiveTabBtn}
                        onPress={() => this.setState({
                            dateFilterSelected: false,
                            daysFilterSelected: true,
                            intervalFilterSelected: false
                        })}>
                        <Text style={this.state.daysFilterSelected ? styles.activeTabTxt : styles.inactiveTabTxt}>Days</Text>
                    </Button>
                    <Button
                        style={this.state.intervalFilterSelected ? styles.activeTabBtn : styles.inactiveTabBtn}

                        onPress={() => this.setState({
                            dateFilterSelected: false,
                            daysFilterSelected: false,
                            intervalFilterSelected: true
                        })}>
                        <Text style={this.state.intervalFilterSelected ? styles.activeTabTxt : styles.inactiveTabTxt}>Interval</Text>
                    </Button>
                </View>
                <View style={{ flex: .01, backgroundColor: colors.primaryBG }}>
                </View>
                <View style={{ flex: .91, backgroundColor: colors.white }}>
                    <ScrollView>
                        {
                            this.state.dateFilterSelected ?
                                this.state.dateScheduleList.length != 0 ? <FlatList
                                    data={this.state.dateScheduleList}
                                    renderItem={({ item }) => <TimeSchedule />}
                                    keyExtractor={item => item.id} /> : <View style={styles.noSchedleFoundDsp}>
                                        <Text style={styles.noScheduleFoundTxt}>No Schedules Found</Text>
                                    </View>
                                : null
                        }
                        {
                            this.state.daysFilterSelected ?
                                this.state.dateScheduleList.length != 0 ? <FlatList
                                    data={this.state.daysScheduleList}
                                    renderItem={({ item }) => <TimeSchedule />}
                                    keyExtractor={item => item.id} /> : <View style={styles.noSchedleFoundDsp}>
                                        <Text style={styles.noScheduleFoundTxt}>No Schedules Found</Text>
                                    </View>
                                : null
                        }
                        {
                            this.state.intervalFilterSelected ?
                                this.state.dateScheduleList.length != 0 ? <FlatList
                                    data={this.state.intervalScheduleList}
                                    renderItem={({ item }) => <TimeSchedule />}
                                    keyExtractor={item => item.id} /> : <View style={styles.noSchedleFoundDsp}>
                                        <Text style={styles.noScheduleFoundTxt}>No Schedules Found</Text>
                                    </View>
                                : null
                        }
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const TimeSchedule = () => {
    return (
        <View style={{
            flex: 1, flexDirection: "column", marginLeft: 15
        }}>
            <View style={{
                flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start",
                marginTop: 10,
                backgroundColor: colors.white,
                margin: 10,
            }}>
                <Text
                    style={{
                        color: colors.headerColor,
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
            <View style={{ flex: 1, height: 5, backgroundColor: colors.primaryBG }}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    activeTabBtn: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: colors.buttonColor,
        margin: 6,
        height: 43,
        borderRadius: 8
    },
    inactiveTabBtn: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: colors.white,
        borderBottomColor: colors.buttonColor,
        borderBottomWidth: 5,
        margin: 6,
        height: 43,
        borderRadius: 8
    },
    activeTabTxt: {
        color: colors.white,
        fontSize: 16
    },
    inactiveTabTxt: {
        color: colors.buttonColor,
        fontSize: 16
    },
    noScheduleFoundTxt: {
        color: colors.buttonColor,
        fontSize: 18,
        fontWeight: "500",
    },
    noSchedleFoundDsp: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        marginTop: 30,
    }
})

export default ViewSchedules;