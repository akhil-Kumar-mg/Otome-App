import { Container } from "native-base";
import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import FloatingButton from "../components/FloatingButton";
import Section from "../components/Section";
import { colors } from "../style/AppStyle";
import { connect } from 'react-redux';

class HomeScreen extends Component {
  static navigationOptions = {
    tabBarLabel: "Home",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="home" size={25} color={colors.white} />
    )
  };

  state = {
    shortcutList: [],
    areaList: [],
    loading: true
  }

  getAllAreas = () => {
    console.debug("called getAll Areas")
    const areaOptions = {
      url: "http://13.232.56.9/api/v1/home/client?uuid=24956"
    }
    fetch(areaOptions.url).then(response => response.json())
      .then(res => {
        console.debug("fetched area :" + res)
        this.setState({
          areaList: res.groups != undefined ? res.groups : []
        })
      }).catch(error => {
        console.debug("fetched area  error:" + error)
        this.setState({
          areaList: []
        })
      })

    const shortCutOptions = {
      url: "http://13.232.56.9/api/v1/home/client?uuid=24956",
      body: { "method": "GET", "url": "/VIEWSCENES" }
    }

    fetch(shortCutOptions.url, {
      method: "POST",
      body: JSON.stringify(shortCutOptions.body)
    }).then(res => {
      console.debug("fetching shortcut :" + res)
      setTimeout(this.getAllShortCuts, 1000)
    }).catch(error => {
      this.setState({
        shortcutList: []
      })
    })
    console.debug("called getAll Areas finished")
  }


  getAllShortCuts = () => {
    console.debug("called getAll shortcuts")

    const shortCutOptions = {
      url: "http://13.232.56.9/api/v1/home/client?uuid=24956"
    }
    fetch(shortCutOptions.url).then(response => response.json())
      .then(res => {
        console.debug("fetched shortcut :" + res)
        this.setState({
          shortcutList: res.scenes != undefined ? res.scenes : []
        })
      }).catch(error => {
        console.debug("fetched shortcut failed :" + error)
        this.setState({
          shortcutList: []
        })
      })
    console.debug("called getAll shortcuts done")

  }

  componentDidMount() {
    const areaOptions = {
      url: "http://13.232.56.9/api/v1/home/client?uuid=24956",
      body: { "method": "GET", "url": "/VIEWGROUPS" }
    }
    fetch(areaOptions.url, {
      method: "POST",
      body: JSON.stringify(areaOptions.body)
    }).then(res => {
      console.debug("fetching area :" + res)
      setTimeout(this.getAllAreas, 1000)
    }).catch(error => {
      console.debug("fetching area failed :" + error)
      this.setState({
        areaList: []
      })
    })

    console.debug("component did mount")
  }
  render() {
    const { navigation } = this.props;
    console.debug("render Area" + this.state.areaList)
    console.debug("render shortCut" + this.state.shortcutList)
    return (
      <Container style={{ backgroundColor: colors.primaryBG }}>
        <ScrollView>
          <Section title={"Shortcuts"} data={this.state.shortcutList} />
          <View
            style={{
              marginTop: 20,
              borderBottomColor: colors.white,
              borderBottomWidth: 3
            }}
          />
          <Section title={"Areas"} data={this.state.areaList} />
        </ScrollView>
        <FloatingButton navigation={navigation} />
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return { shortcutList: state.shortcutList, areaList: state.areaList };
}

// export default connect(mapStateToProps)(HomeScreen);
export default HomeScreen;
