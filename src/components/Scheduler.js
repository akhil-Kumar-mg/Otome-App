import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "native-base";
import DateTimePicker from "react-native-modal-datetime-picker";

export default class DateTimePickerTester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false
    };
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.hideDateTimePicker();
  };

  render() {
    return (
      <View
        style={{
          margin: 20,
          marginTop: 70,
          backgroundColor: "#175E17"
        }}
      >
        <Button
          block
          style={{ color: "#FFF", backgroundColor: "#175E17" }}
          onPress={this.showDateTimePicker}
        >
          <Text style={{ fontSize: 18, color: "#FFF" }}>Add a Schedule</Text>
        </Button>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </View>
    );
  }
}
