import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import useNavigationScreens from "./useNavigationScreens";
import { useGlobalTheme } from "../../theme/useGlobalTheme";

const TabsStack = createBottomTabNavigator();

const TabsNavigator = () => {
  const screens = useNavigationScreens();
  const theme = useGlobalTheme();

  return (
    <TabsStack.Navigator
      screenOptions={{
        freezeOnBlur: true,
        headerShown: false,
        tabBarActiveBackgroundColor: theme.colors.surface,
        tabBarInactiveBackgroundColor: theme.colors.surface,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.secondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.background,
        },
      }}
    >
      {screens.stack.map((screen) => (
        <TabsStack.Screen {...screen} key={screen.name} />
      ))}
    </TabsStack.Navigator>
  );
};

export default TabsNavigator;
