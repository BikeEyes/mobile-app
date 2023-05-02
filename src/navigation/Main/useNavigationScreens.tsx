import { useMemo } from "react";
import { Routes } from "../routes";
import TabsNavigator from "../Tabs";
import DevicesScreen from "../../screens/devices";
import PairDeviceScreen from "../../screens/newDevice";
import { useTheme } from "react-native-paper";

const useNavigationScreens = () => {
  const theme = useTheme();

  return useMemo(
    () => ({
      stack: [
        {
          name: Routes.TABS,
          component: TabsNavigator,
          options: { headerShown: false },
        },
        {
          name: Routes.BT_DEVICES,
          component: DevicesScreen,
          options: {
            title: "",
            headerStyle: {
              backgroundColor: theme.colors.surface,
            },
          },
        },
        {
          name: Routes.NEW_BT_DEVICE,
          component: PairDeviceScreen,
        },
      ],
    }),
    []
  );
};

export default useNavigationScreens;
