import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { Dimensions } from "react-native";
import HomeScreen from "./HomeScreen";
import { colors } from "../style/AppStyle";
import LiveScreen from "./LiveScreen";
import ShortCutScreen from "./ShortCutScreen";
import AreaScreen from "./AreaScreen";

export default createMaterialTopTabNavigator(
  {
    Home: HomeScreen,
    Live: LiveScreen,
    Shortcuts: ShortCutScreen,
    Areas: AreaScreen
  },
  {
    tabBarPosition: "top",
    animationEnabled: false,
    scrollEnabled: true,
    tabBarOptions: {
      activeTintColor: colors.white,
      inactiveTintColor: colors.inactiveTxt,
      style: {
        backgroundColor: colors.lime
      },
      tabStyle: {
        width: Dimensions.get("window").width / 4,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 5
      },
      labelStyle: {
        fontSize: 12,
        fontWeight: "500",
        textAlign: "center"
      },
      indicatorStyle: {
        borderBottomColor: colors.white,
        borderBottomWidth: 2
        // width: Dimensions.get("window").width / 8,
        // marginLeft: Dimensions.get("window").width / 16
      },
      showIcon: false
    },
    navigationOptions: {
      // title: "Otome",
      // headerTintColor: "#FFF",
      headerStyle: {
        backgroundColor: colors.lime,
        elevation: 0,
        height: 0
      }
    },
    style: {
      backgroundColor: colors.lightWhite
    }
  }
);
