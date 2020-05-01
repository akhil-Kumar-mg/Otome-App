import { Button, Container, Content, Input, Item, View } from "native-base";
import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { colors } from "../style/AppStyle";

class CreateArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areaName: ""
    }
  }
  handleChange = (text) => {
    this.setState({
      areaName: text
    })
  }
  handleSubmit = () => {
    if (this.state.areaName) {
      this.props.navigation.navigate("ADD_DEVICE", {
        "areaName": this.state.areaName
      })
    }
  }

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
    return (
      <Container style={styles.container}>
        <Content>
          <View>
            <Text style={styles.heading}>Create an area</Text>
          </View>
          <Item regular style={styles.inputBox}>
            <Input
              value={this.state.areaName}
              style={{ fontSize: 15, marginLeft: 5 }}
              placeholder="Type area name here"
              placeholderTextColor={colors.buttonColor}
              onChangeText={this.handleChange}
            />
          </Item>
        </Content>
        <Button
          block
          style={styles.nextButton}
          onPress={this.handleSubmit}
        >
          <Text style={{ color: colors.white, fontSize: 20 }}>Next</Text>
        </Button>
      </Container>
    );
  }
}

export default withNavigation(CreateArea);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBG
  },
  heading: {
    flex: 1,
    color: colors.buttonColor,
    marginTop: 100,
    marginLeft: 20,
    fontSize: 25
  },
  inputBox: {
    flex: 1,
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 4,
    minHeight: 60,
    backgroundColor: colors.white
  },
  nextButton: {
    minHeight: 60,
    backgroundColor: colors.headerColor
  }
});
