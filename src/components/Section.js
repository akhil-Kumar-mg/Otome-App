import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../style/AppStyle";
import CardList from "./FlatList";
import Icon from "react-native-vector-icons/Entypo";
import { EmptySection } from "./EmptySection";

export default class Section extends Component {
  render() {
    const { title } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{title}</Text>
          {/* <Icon size={25} color={colors.black} name="chevron-small-down" /> */}
        </View>
        <View style={styles.itemListContainer}>
          {DATA.length == 0 ? (
            <EmptySection title={title} />
          ) : (
            <CardList data={DATA} />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { margin: 20, marginBottom: 20, marginTop: 25, flexDirection: "row" },
  headerTitle: {
    color: colors.green,
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5
  },
  itemListContainer: {
    flex: 1,
    margin: 10,
    marginTop: 0,
    marginBottom: 0
  }
});

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item"
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item"
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item"
  }
];
