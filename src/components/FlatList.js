import React, { Component } from "react";
import { FlatList } from "react-native";
import OtomeCard from "./OtomeCard";
import { colors } from "../style/AppStyle";

export default class List extends Component {
  render() {
    const { data, type } = this.props;
    return (
      <FlatList
        data={data}
        renderItem={({ item }) => <OtomeCard item={item} type={type} />}
        keyExtractor={item => item.name}
        numColumns="2"
      />
    );
  }
}
