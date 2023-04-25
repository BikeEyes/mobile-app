import { useMemo } from "react";
import { Routes } from "../routes";
import TabsNavigator from "../Tabs";
import DevicesScreen from "../../screens/devices";

const useNavigationScreens = () => {
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
        },
      ],
    }),
    []
  );
};

export default useNavigationScreens;
