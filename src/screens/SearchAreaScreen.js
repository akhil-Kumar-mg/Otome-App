import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Searchbar, Surface, List, Divider } from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import { addDevice } from '../api/ApiService';
import { colors } from '../style/AppStyle';

export default class SearchAreaScreen extends Component {
    state = {
        searchQuery: '',
        areaList: [],
        loading: false,
        searchResult: [],
        selectedArea: ""
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: {
                backgroundColor: colors.headerColor
            },
            headerTintColor: colors.white,
            title: "Select an area"
        };
    };

    componentDidMount() {
        this.setState({ loading: true });
        const areaOptions = {
            url: "http://13.232.56.9/api/v1/home/client?uuid=24956",
            body: { "method": "GET", "url": "/VIEWGROUPS" }
        }
        fetch(areaOptions.url, {
            method: "POST",
            body: JSON.stringify(areaOptions.body)
        }).then(res => {
            setTimeout(this.getAllAreas, 1000)
        }).catch(error => {
            this.setState({
                areaList: []
            })
        })
    }

    getAllAreas = () => {
        const areaOptions = {
            url: "http://13.232.56.9/api/v1/home/client?uuid=24956"
        }
        fetch(areaOptions.url).then(response => response.json())
            .then(res => {
                this.setState({
                    areaList: res.groups != undefined ? res.groups : [],
                    searchResult: res.groups != undefined ? res.groups : []
                })
            }).catch(error => {
                this.setState({
                    areaList: []
                })
            })

    }

    _onChangeSearch = query => {
        const newData = this.state.areaList.filter(item => {
            const itemData = `${item.name.toUpperCase()}`;
            const textData = query.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });

        this.setState({
            searchResult: newData,
            searchQuery: query
        });
    }

    handleSubmit = () => {
        const { navigation } = this.props;
        if (this.state.selectedArea.length == 0) {
            Toast.show("Please selecte an area to proceed");
            return;
        }
        addDevice(this.state.selectedArea, navigation.getParam('deviceName')
            , navigation.getParam('address')
            , navigation.getParam('channel'), navigation.getParam('deviceType')).then(res => {
                Toast.show("Added device")
                navigation.navigate("HOME")
            }).catch(error => {
                Toast.show("Adding device failed")
            })
    }

    render() {
        const { searchQuery, searchResult } = this.state;
        return (
            <Surface style={styles.container}>
                <View style={{
                    backgroundColor: colors.headerColor
                }}>
                    <Searchbar
                        placeholder="Select an Area"
                        onChangeText={this._onChangeSearch}
                        value={searchQuery}
                        selectionColor={colors.buttonColor}
                        autoCorrect={false}
                        placeholderTextColor={colors.buttonColor}
                        style={{
                            borderWidth: 2,
                            borderRadius: 10,
                            borderColor: colors.headerColor,
                            margin: 10
                        }}
                    />
                </View>
                <View>
                    {this.state.searchResult.length == 0 ?
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignContent: "center",
                            marginTop: 50
                        }}>
                            <Text style={{ color: colors.buttonColor, fontSize: 18, fontWeight: "400" }}>
                                No Areas found
                        </Text>
                        </View> :
                        <FlatList
                            extraData={this.state}
                            data={searchResult}
                            keyExtractor={item => item.name}
                            onPress
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity onPress={() => {
                                        this.setState({
                                            searchQuery: item.name,
                                            selectedArea: item.name
                                        })
                                    }}>
                                        <List.Item
                                            title={item.name}
                                            titleStyle={{ color: colors.buttonColor }}
                                            // description="Item description"
                                            style={{ color: colors.buttonColor }}
                                            left={props => <List.Icon {...props} icon="folder" />}
                                        />
                                        <Divider style={{ padding: 1 }} />
                                    </TouchableOpacity>

                                )
                            }}
                        />}
                </View>
                <View style={styles.saveArea}>
                    <Button
                        style={styles.saveBtn}
                        contentStyle={{ height: 60, minHeight: 60 }}
                        labelStyle={{ color: colors.white, fontSize: 18 }}
                        mode="contained"
                        onPress={this.handleSubmit}>
                        Save
          </Button>
                </View>
            </Surface>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryBG
    },
    saveArea: {
        position: "absolute",
        width: "100%",
        bottom: 0,
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: colors.white
    },
    item: {

    }
})