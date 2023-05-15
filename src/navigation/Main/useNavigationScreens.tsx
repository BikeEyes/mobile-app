import { useMemo } from "react";
import { Routes } from "../routes";
import TabsNavigator from "../Tabs";
import DevicesScreen from "../../screens/devices";
import { useGlobalTheme } from "../../theme/useGlobalTheme";

const useNavigationScreens = () => {
  const theme = useGlobalTheme();

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
            headerStyle: {
              backgroundColor: theme.colors.background,
            },
            headerTintColor: theme.colors.onBackground,
          },
        },
      ],
    }),
    []
  );
};

export default useNavigationScreens;
