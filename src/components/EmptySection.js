import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { colors } from "../style/AppStyle";
import { Button } from "native-base";

export const EmptySection = props => {
  const { title } = props;
  const displayNote = "No " + title + ", please add";
  let btnTxt = "";
  if (title == "Areas") {
    btnTxt = "Add an area";
  } else if (title == "Shortcuts") {
    btnTxt = "Add a Shortcut";
  } else if (title == "Live Devices") {
    btnTxt = "Add a device";
  }
  return (
    <View style={styles.container}>
      <Icon name="addfile" size={70} color={colors.lime}></Icon>
      <Text style={styles.displayNote}>{displayNote}</Text>
      <Button rounded style={styles.btn}>
        <Text style={styles.btnTxt}> {btnTxt}</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height / 2 - 80
  },
  btn: {
    backgroundColor: colors.lime,
    margin: 15,
    width: 130,
    height: 30,
    justifyContent: "center"
  },
  btnTxt: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "bold"
  },
  displayNote: {
    color: colors.lime,
    fontSize: 12,
    fontWeight: "500"
  }
});
