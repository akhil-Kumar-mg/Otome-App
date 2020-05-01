import { Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { colors } from "../style/AppStyle";
import AreaTabScreen from "./AreaTabScreen";
import HomeTabScreen from "./HomeTabScreen";
import DeviceTabScreen from "./DeviceTabScreen";
import ShortCutTabScreen from "./ShortCutTabScreen";

export default createMaterialTopTabNavigator(
  {
    Home: HomeTabScreen,
    Devices: DeviceTabScreen,
    Shortcuts: ShortCutTabScreen,
    Areas: AreaTabScreen
  },
  {
    tabBarPosition: "top",
    animationEnabled: true,
    scrollEnabled: true,
    lazy: true,
    tabBarOptions: {
      activeTintColor: colors.white,
      upperCaseLabel: false,
      inactiveTintColor: colors.inactiveTxt,
      style: {
        backgroundColor: colors.headerColor,
      },
      tabStyle: {
        width: Dimensions.get("window").width / 4
      },
      labelStyle: {
        fontSize: 14,
        fontWeight: "500",
        textAlign: "center",
        padding: 0
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
        backgroundColor: colors.headerColor,
        elevation: 0,
        height: 10
      }
    },
    style: {
      backgroundColor: colors.lightWhite
    }
  }
);
