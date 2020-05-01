import React, { Component } from 'react';
import { View, Text, StyleSheet, Switch } from "react-native";
import { colors } from '../style/AppStyle';
import { Icon, Button } from "native-base";
import { withNavigation } from "react-navigation";

class ActionItemDetail extends Component {
    render() {
        const { navigation } = this.props;

        return (
            <View>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", margin: 10, minHeight: 60 }}>
                    <Switch trackColor={{ true: colors.lime, false: "orange" }} value={false} />
                    <Text style={styles.deviceName}>Light</Text>
                    <Icon
                        style={{ color: colors.headerColor, marginLeft: 20 }}
                        type="Ionicons"
                        name="ios-color-palette"
                        onPress={() => navigation.navigate("COLOR_PICKER")}
                    />
                    <Button style={{ backgroundColor: colors.buttonColor, position: "absolute", right: 0, width: 70, borderRadius: 5 }}>
                        <Text style={{ color: colors.white, fontSize: 15, marginLeft: 20 }}>Add</Text>
                    </Button>
                </View >
                <View
                    style={{
                        borderBottomColor: colors.lightWhite,
                        borderBottomWidth: 2,
                        marginLeft: 10,
                        marginRight: 10
                    }}
                />
            </View>
        )
    }
}

export default withNavigation(ActionItemDetail);


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
    },
    deviceName: {
        color: colors.buttonColor,
        fontSize: 15,
        marginLeft: 40,
        fontWeight: "bold"
    }
});
