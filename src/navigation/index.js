import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ColorPicker from "../components/ColorPicker";
import Scheduler from "../components/Scheduler";
import ViewSchedules from "../components/ViewSchedules";
import AddDevice from "../screens/AddDevice";
import CreateActionSet from "../screens/CreateActionSet";
import CreateArea from "../screens/CreateArea";
import CreateShortCut from "../screens/CreateShortCut";
import HomeDetailScreen from "../screens/HomeDetailScreen";
import HomeScreen from "../screens/HomeScreen";

const navigator = createStackNavigator(
  {
    HOME: HomeScreen,
    CREATE_SHORTCUT: CreateShortCut,
    CREATE_AREA: CreateArea,
    HOME_DETAIL: HomeDetailScreen,
    CREATE_ACTION_SET: CreateActionSet,
    ADD_DEVICE: AddDevice,
    SCHEDULER: Scheduler,
    COLOR_PICKER: ColorPicker,
    VIEW_SCHEDULES: ViewSchedules
  },
  {
    initialRouteName: "ADD_DEVICE",
    headerLayoutPreset: "center"
  }
);

export default createAppContainer(navigator);
