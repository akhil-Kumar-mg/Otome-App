import React, { Component } from "react";
import { FAB } from 'react-native-paper';
import { colors } from "../style/AppStyle";
import { StyleSheet } from 'react-native';
export default class FloatingButton extends Component {

  state = {
    open: false,
  };

  _onStateChange = ({ open }) => this.setState({ open });

  render() {
    const { open } = this.state;
    const { navigate } = this.props.navigation;
    return (

      <FAB.Group
        open={open}
        icon="scale-bathroom"
        color={colors.buttonColor}
        fabStyle={styles.iconStyle}
        actions={[
          { icon: 'scale-bathroom', label: 'Add a Device', onPress: () => navigate("ADD_DEVICE"), color: colors.buttonColor },
          { icon: 'scale-bathroom', label: 'Add a ShortCut', onPress: () => navigate("CREATE_SHORTCUT"), color: colors.buttonColor },
          { icon: 'scale-bathroom', label: 'Add an Area', onPress: () => navigate("CREATE_AREA"), color: colors.buttonColor },
        ]}
        onStateChange={this._onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />

    );
  }
}

const styles = StyleSheet.create({
  iconStyle: {
    color: colors.buttonColor,
    backgroundColor: colors.white
  }

})