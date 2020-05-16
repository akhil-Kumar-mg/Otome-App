import { Container } from "native-base";
import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AreaDetail from "../components/AreaDetail";
import ShortCutDetail from "../components/ShortCutDetail";
import { colors } from "../style/AppStyle";

export default class HomeDetailScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: {
                backgroundColor: colors.headerColor
            },
            headerTintColor: colors.white,
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate("HOME")}>
                    <Text style={{ color: colors.white, fontSize: 16, marginRight: 15 }}>
                        Cancel
          </Text>
                </TouchableOpacity>
            )
        };
    };
    render() {
        const { navigation } = this.props;
        return (
            <Container style={styles.container}>
                {navigation.getParam('type') === 'Shortcuts' ?
                    <ShortCutDetail id={navigation.getParam('id')} name={navigation.getParam('name')} /> : null}
                {navigation.getParam('type') === 'Areas' ? <AreaDetail name={navigation.getParam('name')} /> : null}
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryBG
    }
});
