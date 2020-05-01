import React, { Component } from "react";
import { Container, Content, Button, Switch, Icon, Card, CardItem } from "native-base";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { colors } from "../style/AppStyle";
import ActionItem from "../components/ActionItem";

export default class CreateActionSet extends Component {

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
          <View style={styles.header}>
            <Text style={styles.headerTxt}>Create your action set</Text>
          </View>
          <FlatList
            data={DATA}
            renderItem={({ item }) => <ActionItem />}
            keyExtractor={item => item.id}
          />
        </Content>
        <Button block style={styles.saveBtn}>
          <Text style={{ color: colors.white, fontSize: 20 }}>Save</Text>
        </Button>
      </Container>
    );
  }
}

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item"
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item"
  }
  ,
  {
    id: "3ac68wafc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Third Item"
  }
];


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBG
  },
  header: {
    marginTop: 40,
    marginLeft: 15
  },
  headerTxt: {
    color: colors.buttonColor,
    fontSize: 25
  },
  saveBtn: {
    minHeight: 60,
    backgroundColor: colors.headerColor
  }
});
