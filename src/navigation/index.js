import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ActionList from "../screens/ActionList";
import CreateActionSet from "../screens/CreateActionSet";
import CreateArea from "../screens/CreateArea";
import CreateShortCut from "../screens/CreateShortCut";
import ShortCutDetail from "../screens/ShortCutDetail";
import TabScreen from "../screens/TabScreen";

const navigator = createStackNavigator(
  {
    HOME: TabScreen,
    ACTION_LIST: ActionList,
    CREATE_SHORTCUT: CreateShortCut,
    CREATE_AREA: CreateArea,
    SHORTCUT_DETAIL: ShortCutDetail,
    CREATE_ACTION_SET: CreateActionSet
  },
  {
    initialRouteName: "HOME",
    headerLayoutPreset: "center"
  }
);

export default createAppContainer(navigator);
