import { Button, Container, Content, Input, Item, View } from "native-base";
import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

class CreateArea extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: "#1f1f1f"
      },
      headerTintColor: "#FFF",
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("HOME")}>
          <Text style={{ color: "#FFF", fontSize: 16, marginRight: 15 }}>
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
        <Content>
          <View>
            <Text style={styles.heading}>Create an area</Text>
          </View>
          <Item regular style={styles.inputBox}>
            <Input
              style={{ color: "#696969" }}
              placeholder="Type area name here"
            />
          </Item>
        </Content>
        <Button
          block
          style={styles.nextButton}
          onPress={() => navigation.navigate("CREATE_ACTION_SET")}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Next</Text>
        </Button>
      </Container>
    );
  }
}

export default withNavigation(CreateArea);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101010"
  },
  heading: {
    flex: 1,
    color: "#FFFFF1",
    marginTop: 100,
    marginLeft: 20,
    fontSize: 25
  },
  inputBox: {
    flex: 1,
    borderColor: "#FFFFF1",
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 4,
    backgroundColor: "#FFFFF1"
  },
  nextButton: {
    minHeight: 60,
    backgroundColor: "#175E17"
  }
});
