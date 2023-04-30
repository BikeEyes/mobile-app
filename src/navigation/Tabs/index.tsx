import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import useNavigationScreens from "./useNavigationScreens";

const TabsStack = createBottomTabNavigator();

const TabsNavigator = () => {
  const screens = useNavigationScreens();

  return (
    <TabsStack.Navigator
      screenOptions={{ freezeOnBlur: true, headerShown: false }}
    >
      {screens.stack.map((screen) => (
        <TabsStack.Screen {...screen} key={screen.name} />
      ))}
    </TabsStack.Navigator>
  );
};

export default TabsNavigator;
