import { Card, Button } from "native-base";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/AntDesign";
import { withNavigation } from "react-navigation";
import { colors } from "../style/AppStyle";

class OtomeCard extends Component {
  render() {
    const { navigation, item } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.navigate("SHORTCUT_DETAIL");
          }}
        >
          <Card style={styles.card}>
            <Button
              style={styles.powerBtn}
              activeOpacity={1}
              onPress={() => {
                return;
              }}
            >
              <Icon
                size={22}
                name="poweroff"
                style={styles.powerIcon}
                color={colors.white}
              />
            </Button>

            <Text style={styles.title}>{item.title}</Text>
            <Icon
              name="setting"
              size={26}
              color={colors.green}
              style={styles.icon}
              on
            />
          </Card>
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
    alignContent: "center",
    borderRadius: 10,
    minHeight: 100,
    maxHeight: 100,
    backgroundColor: "#f0f0f0"
  },
  title: {
    color: colors.paleGreen,
    position: "absolute",
    bottom: 0,
    left: 0,
    marginLeft: 15,
    marginBottom: 20,
    fontSize: 14,
    fontWeight: "bold"
  },
  icon: {
    position: "absolute",
    top: 0,
    left: 0,
    marginLeft: 15,
    marginTop: 20
  },
  powerIcon: {
    backgroundColor: colors.lime
  },
  powerBtn: {
    justifyContent: "center",
    position: "absolute",
    top: 0,
    right: 0,
    marginRight: 10,
    marginTop: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lime
  }
});
