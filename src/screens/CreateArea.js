import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, HelperText, TextInput, Surface } from 'react-native-paper';
import { withNavigation } from "react-navigation";
import { colors } from "../style/AppStyle";

class CreateArea extends Component {

  state = {
    areaName: ''
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: colors.headerColor
      },
      headerTintColor: colors.white,
      title: "Create an Area",
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("HOME")}>
          <Text style={{ color: colors.white, fontSize: 16, marginRight: 15 }}>
            Cancel
          </Text>
        </TouchableOpacity>
      )
    };
  }

  _onChangeText = text => this.setState({ areaName: text });

  _hasErrors = () => {
    return this.state.areaName.length == 0 ? true : false;
  }

  _handleSubmit = () => {
    if (this.state.areaName) {
      this.props.navigation.navigate("ADD_DEVICE", {
        "areaName": this.state.areaName
      })
    }
  }

  render() {
    const { theme } = this.props;
    return (
      <Surface style={styles.container}>
        <View style={styles.area}>
          <View style={styles.inputBox}>
            <TextInput
              label="Area Name"
              value={this.state.areaName}
              style={styles.textArea}
              onChangeText={this._onChangeText}
              underlineColor={colors.buttonColor}
            />
            <HelperText
              type="error"
              visible={this._hasErrors()}
            >
              Area name can't be empty!
        </HelperText>
          </View>
        </View>
        <View style={styles.saveArea}>
          <Button
            style={styles.saveBtn}
            contentStyle={{ height: 60, minHeight: 60 }}
            labelStyle={{ color: colors.white, fontSize: 18 }}
            mode="contained"
            onPress={() => console.log('Pressed')}>
            Save
          </Button>
        </View>

      </Surface>
    );
  }
}

export default withNavigation(CreateArea);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  inputBox: {
    backgroundColor: colors.white,
    marginLeft: 20,
    marginRight: 20
  },
  area: {
    color: colors.white,
    marginTop: 15
  },
  saveArea: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: colors.white
  },
  textArea: {
    backgroundColor: colors.white,
    color: colors.white
  },
  saveBtn: {
    flex: 1,
    backgroundColor: colors.headerColor
  }
});
