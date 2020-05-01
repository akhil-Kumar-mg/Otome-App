import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Switch } from "react-native";
import { Icon } from "native-base";
import ActionItemDetail from './ActionItemDetail';
import { colors } from '../style/AppStyle';

export default class ActionItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showItems: true
        }
    }
    render() {
        return (
            <View style={{ margin: 20, backgroundColor: colors.white }}>
                <TouchableOpacity onPress={() => this.setState({
                    showItems: !this.state.showItems
                })}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <Text style={styles.itemTitle}> Grand Bedroom</Text>
                        <Icon
                            style={styles.titleIcon}
                            type="Entypo"
                            name="chevron-small-up"
                        />
                    </View>
                </TouchableOpacity>
                {this.state.showItems ? <View>
                    <FlatList
                        data={DATA}
                        renderItem={({ item }) => <ActionItemDetail />}
                        keyExtractor={item => item.id}
                    />
                </View> : null}

            </View>
        );
    }
}

const DATA = [
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "First Item"
    },
    {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "Second Item"
    }
    ,
    {
        id: "3ac68wafc-c605-48d3-a4f8-fbd91aa97f63",
        title: "Third Item"
    }
];

const styles = StyleSheet.create({
    itemTitle: {
        marginTop: 20,
        fontSize: 15,
        color: colors.buttonColor,
        fontWeight: "800"
    },
    titleIcon: {
        position: "absolute",
        top: 0,
        right: 0,
        color: colors.buttonColor,
        marginRight: 15,
        marginTop: 20,
        backgroundColor: "transparent"
    }
});
