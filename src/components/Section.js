import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../style/AppStyle";
import { EmptySection } from "./EmptySection";
import CardList from "./FlatList";

export default class Section extends Component {

  render() {
    const { title, data } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <View style={styles.itemListContainer}>
          {data.length == 0 ? (
            <EmptySection title={title} />
          ) : (
              <CardList data={data} type={title} />
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
    color: colors.titleColor,
    fontSize: 20,
    fontWeight: "500",
    letterSpacing: 0.5
  },
  itemListContainer: {
    flex: 1,
    margin: 10,
    marginTop: 0,
    marginBottom: 0
  }
});
