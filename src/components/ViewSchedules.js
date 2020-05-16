import { Button, Icon, Fab } from "native-base";
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../style/AppStyle';
import { viewSchedules, get } from '../api/ApiService'

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

    getAllSchedules = () => {
        get().then(res => {
            let dateSchedules = [], daysSchedules = [], intervalSchedules = [];
            if (res.SCHEDULES != undefined) {
                if (res.SCHEDULES.length > 0) {
                    dateSchedules = res.SCHEDULES[0].schedules
                }
                if (res.SCHEDULES.length > 1) {
                    daysSchedules = res.SCHEDULES[1].schedules
                }
                if (res.SCHEDULES.length > 2) {
                    intervalSchedules = res.SCHEDULES[2].schedules
                }
                this.setState({
                    dateScheduleList: dateSchedules,
                    daysScheduleList: daysSchedules,
                    intervalScheduleList: intervalSchedules
                })
            }
        }).catch(error => {
            this.setState({
                dateScheduleList: [],
                daysScheduleList: [],
                intervalScheduleList: []
            })
        })
    }

    componentDidMount() {
        this.renderSchedules()
    }
    renderSchedules = () => {
        viewSchedules().then(res => {
            setTimeout(this.getAllSchedules, 1000)
        }).catch(error => {
            this.setState({
                dateScheduleList: [],
                daysScheduleList: [],
                intervalScheduleList: []
            })
        })
    }
    render() {
        const { navigation } = this.props;
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
                                    renderItem={({ item }) => <TimeSchedule item={item} />}
                                    keyExtractor={item => item.id} /> : <View style={styles.noSchedleFoundDsp}>
                                        <Text style={styles.noScheduleFoundTxt}>No Schedules Found</Text>
                                    </View>
                                : null
                        }
                        {
                            this.state.daysFilterSelected ?
                                this.state.daysScheduleList.length != 0 ? <FlatList
                                    data={this.state.daysScheduleList}
                                    renderItem={({ item }) => <DayOrIntervalSchedule item={item} />}
                                    keyExtractor={item => item.id} /> : <View style={styles.noSchedleFoundDsp}>
                                        <Text style={styles.noScheduleFoundTxt}>No Schedules Found</Text>
                                    </View>
                                : null
                        }
                        {
                            this.state.intervalFilterSelected ?
                                this.state.intervalScheduleList.length != 0 ? <FlatList
                                    data={this.state.intervalScheduleList}
                                    renderItem={({ item }) => <DayOrIntervalSchedule item={item} />}
                                    keyExtractor={item => item.id} /> : <View style={styles.noSchedleFoundDsp}>
                                        <Text style={styles.noScheduleFoundTxt}>No Schedules Found</Text>
                                    </View>
                                : null
                        }
                    </ScrollView>
                </View>
                <View>
                    <Fab
                        active={true}
                        direction="up"
                        style={{ backgroundColor: colors.white }}
                        position="bottomRight"
                        onPress={() => navigation.navigate('SCHEDULER', { handleScheduleUpdate: this.renderSchedules })}>
                        <Icon name="add" style={{ color: colors.buttonColor }} />
                    </Fab>
                </View>
            </View>
        )
    }
}

const DayOrIntervalSchedule = (props) => {
    const { item } = props;
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
                        color: colors.buttonColor,
                        // fontWeight: "600",
                        fontSize: 24,
                        marginTop: 15,
                        right: 15,
                        position: "absolute"
                    }}
                >
                    {item.time}
                </Text>
                <View style={{
                    marginLeft: 10,
                    marginTop: 5
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "500",
                        color: colors.buttonColor
                    }}> {item.name}</Text>
                </View>

                <View
                    style={{ flexDirection: "row", marginLeft: 10, marginBottom: 10 }}
                >
                    <View style={item.mon == 1 ? styles.dayON : styles.dayOFF}>
                        <Text style={item.mon == 1 ? styles.dayONtxt : styles.dayOFFtxt}>M</Text>
                    </View>
                    <View style={item.tue == 1 ? styles.dayON : styles.dayOFF}>
                        <Text style={item.tue == 1 ? styles.dayONtxt : styles.dayOFFtxt}>T</Text>
                    </View>
                    <View style={item.wed == 1 ? styles.dayON : styles.dayOFF}>
                        <Text style={item.wed == 1 ? styles.dayONtxt : styles.dayOFFtxt}>W</Text>
                    </View>
                    <View style={item.thu == 1 ? styles.dayON : styles.dayOFF}>
                        <Text style={item.thu == 1 ? styles.dayONtxt : styles.dayOFFtxt}>T</Text>
                    </View>
                    <View style={item.fri == 1 ? styles.dayON : styles.dayOFF}>
                        <Text style={item.fri == 1 ? styles.dayONtxt : styles.dayOFFtxt}>F</Text>
                    </View>
                    <View style={item.sat == 1 ? styles.dayON : styles.dayOFF}>
                        <Text style={item.sat == 1 ? styles.dayONtxt : styles.dayOFFtxt}>S</Text>
                    </View>
                    <View style={item.sun == 1 ? styles.dayON : styles.dayOFF}>
                        <Text style={item.sun == 1 ? styles.dayONtxt : styles.dayOFFtxt}>S</Text>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, height: 5, backgroundColor: colors.primaryBG }}>

            </View>
        </View>
    )
}


const TimeSchedule = (props) => {
    const { item } = props;
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
                    {item.time}
                </Text>
                <View style={{
                    marginLeft: 10,
                    marginTop: 5,
                }}>
                    <Text style
                        ={{
                            fontSize: 16,
                            fontWeight: "500",
                            color: colors.buttonColor
                        }}>{item.name}</Text>
                </View>
                <View
                    style={{ flexDirection: "row", marginLeft: 10, marginBottom: 10 }}
                >
                    <View >
                        <Text style={{
                            color: "#A8A8A8", fontSize: 13, marginTop: 5,
                        }}>{item.date}</Text>
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
    },
    dayONtxt: {
        color: colors.white
    },
    dayOFFtxt: {
        color: colors.buttonColor
    },
    dayON: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 5,
        marginTop: 15,
        backgroundColor: colors.headerColor,
        borderRadius: 10,
        borderColor: colors.headerColor,
        borderWidth: 1,
        width: 25,
        height: 25,
        marginRight: 5,
        alignItems: "center",
        justifyContent: "center"

    },
    dayOFF: {
        color: colors.headerColor,
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 5,
        marginTop: 15,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.buttonColor,
        borderRadius: 10,
        width: 25,
        height: 25,
        marginRight: 5,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default ViewSchedules;