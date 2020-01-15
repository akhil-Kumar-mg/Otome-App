import React, { Component } from "react";
import { FlatList } from "react-native";
import OtomeCard from "./OtomeCard";

export default class List extends Component {
  render() {
    const { data } = this.props;
    return (
      <FlatList
        data={data}
        renderItem={({ item }) => <OtomeCard item={item} />}
        keyExtractor={item => item.id}
        numColumns="2"
      />
    );
  }
}
