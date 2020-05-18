import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, HelperText, TextInput, Surface } from 'react-native-paper';
import { withNavigation } from "react-navigation";
import { colors } from "../style/AppStyle";
import { createArea } from "../api/ApiService";

class CreateArea extends Component {

  state = {
    areaName: '',
    invalidAreaName: false
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

  _onChangeText = text => {
    if (text == '') {
      this.setState({
        areaName: text,
        invalidAreaName: true
      })
    } else {
      this.setState({
        areaName: text,
        invalidAreaName: false
      })
    }
  };

  _handleSubmit = () => {
    if (this.state.areaName.length == 0) {
      this.setState({
        invalidAreaName: true
      })
      return;
    }
    createArea(this.state.areaName);
    this.props.navigation.navigate("HOME")
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
              theme={{ colors: { text: colors.buttonColor, placeholder: colors.headerColor } }}

            />{
              this.state.invalidAreaName ?
                <HelperText
                  type="error"
                  visible={this.state.invalidAreaName}
                >
                  Area name can't be empty!
        </HelperText> : null
            }

          </View>
        </View>
        <View style={styles.saveArea}>
          <Button
            style={styles.saveBtn}
            contentStyle={{ height: 60, minHeight: 60 }}
            labelStyle={{ color: colors.white, fontSize: 18 }}
            mode="contained"
            onPress={this._handleSubmit}>
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
