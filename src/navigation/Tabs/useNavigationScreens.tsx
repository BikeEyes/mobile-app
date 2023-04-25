import { useMemo } from "react";
import HomeScreen from "../../screens/home";
import SettingsScreen from "../../screens/settings";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Routes } from "../routes";

const useNavigationScreens = () => {
  return useMemo(
    () => ({
      stack: [
        {
          name: Routes.HOME,
          component: HomeScreen,
          options: {
            tabBarIcon: ({ color }) => (
              <Icon name="home" color={color} size={26} />
            ),
          },
        },
        {
          name: Routes.SETTINGS,
          component: SettingsScreen,
          options: {
            tabBarIcon: ({ color }) => (
              <Icon name="settings" color={color} size={26} />
            ),
          },
        },
      ],
    }),
    []
  );
};

export default useNavigationScreens;
