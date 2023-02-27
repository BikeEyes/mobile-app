import { useMemo } from "react";
import AnalyticsScreen from "../../screens/analytics";
import HomeScreen from "../../screens/home";
import SettingsScreen from "../../screens/settings";
import Icon from "react-native-vector-icons/MaterialIcons";

const useNavigationScreens = () => {
  return useMemo(
    () => ({
      stack: [
        {
          name: "Home",
          component: HomeScreen,
          options: {
            tabBarIcon: ({ color }) => (
              <Icon name="home" color={color} size={26} />
            ),
          },
        },
        {
          name: "Analytics",
          component: AnalyticsScreen,
          options: {
            tabBarIcon: ({ color }) => (
              <Icon name="analytics" color={color} size={26} />
            ),
          },
        },
        {
          name: "Settings",
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
