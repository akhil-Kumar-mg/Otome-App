import { Card, Button } from "native-base";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/AntDesign";
import { withNavigation } from "react-navigation";
import { colors } from "../style/AppStyle";

class OtomeCard extends Component {
  state = {
    isOn: false
  }
  componentDidMount() {

  }

  _turnONShortcut = () => {
    this.setState({
      isOn: !this.state.isOn
    })
  }
  render() {
    const { navigation, item, type } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          {type === "Shortcuts" ? <Icon
            style={this.state.isOn ? styles.powerIconON : styles.powerIconOFF}
            size={22}
            name="poweroff"
            onPress={this._turnONShortcut}
          /> : null}

          <Text style={styles.title}>{item.name}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (type === 'Shortcuts') {
              navigation.navigate("HOME_DETAIL", {
                type,
                "id": item.id,
                "name": item.name
              });
            } else if (type === 'Areas') {
              navigation.navigate("HOME_DETAIL", {
                type,
                "name": item.name
              });
            }
          }}
        >
          <View style={{
            minHeight: 25,
            maxHeight: 25,
            backgroundColor: "#9CC3D5",
            borderWidth: 2,
            borderColor: "#9CC3D5",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            justifyContent: "center"
          }}>
            <Icon
              style={{ marginLeft: 5, color: colors.white }}
              size={20}
              name="arrowright"
            />
          </View>
        </TouchableOpacity>
      </View>

    );
  }
}

export default withNavigation(OtomeCard);

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    margin: 5
  },
  card: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 80,
    maxHeight: 80,
    borderWidth: 2,
    borderColor: colors.buttonColor,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: colors.buttonColor,
    flexWrap: "wrap"
  },
  title: {
    color: colors.white,
    // position: "absolute",
    // top: 0,
    // left: 0,
    // marginLeft: 15,
    marginTop: 10,
    fontSize: 16,
  },
  icon: {
    position: "absolute",
    top: 0,
    left: 0,
    marginLeft: 15,
    marginTop: 20
  },
  powerIconOFF: {
    position: "absolute",
    top: 10,
    right: 10,
    color: colors.white
  },
  powerIconON: {
    position: "absolute",
    top: 10,
    right: 10,
    color: "yellow"
  },
  powerBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    backgroundColor: "transparent"
  }
});
