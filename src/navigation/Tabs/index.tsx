import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import useNavigationScreens from "./useNavigationScreens";

const TabsStack = createMaterialBottomTabNavigator();

const TabsNavigator = () => {
  const screens = useNavigationScreens();

  return (
    <TabsStack.Navigator>
      {screens.stack.map((screen) => (
        <TabsStack.Screen {...screen} key={screen.name} />
      ))}
    </TabsStack.Navigator>
  );
};

export default TabsNavigator;
