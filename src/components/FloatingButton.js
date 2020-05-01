import React, { Component } from "react";
import { Fab, Button } from "native-base";
import { View, Text } from "react-native";
import { colors } from "../style/AppStyle";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class FloatingButton extends Component {

  state = {
    active: false
  }

  // componentDidMount() {
  //   this.setState({
  //     active: true
  //   })
  //   this.setState({
  //     active: false
  //   })
  // }
  componentWillUnmount() {
    this.setState({
      active: false
    })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
        <Fab
          active={this.state.active}
          direction="up"
          style={{ backgroundColor: colors.white }}
          position="bottomRight"
          onPress={() => {
            this.setState({
              active: !this.state.active
            })
          }}
        >
          <Icon name="add" style={{ color: colors.buttonColor }} />
          <Button style={{ backgroundColor: '#34A34F' }} onPress={() => navigate("CREATE_SHORTCUT")}>
            <Icon name="group" size={25} color={colors.white} />
          </Button>
          <Button style={{ backgroundColor: '#3B5998' }} onPress={() => navigate("CREATE_AREA")}>
            <Icon name="person" size={25} color={colors.white} />
          </Button>
          <Button style={{ backgroundColor: '#DD5144' }}
            onPress={() => navigate("ADD_DEVICE")}>
            <Icon name="devices" size={25} color={colors.white} />
          </Button>

        </Fab>
      </View>
    );
  }
}
