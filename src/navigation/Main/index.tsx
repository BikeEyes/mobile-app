import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import useNavigationScreens from "./useNavigationScreens";

const MainStack = createMaterialBottomTabNavigator();

const MainNavigator = () => {
  const screens = useNavigationScreens();

  return (
    <MainStack.Navigator>
      {screens.stack.map((screen) => (
        <MainStack.Screen {...screen} key={screen.name} />
      ))}
    </MainStack.Navigator>
  );
};

export default MainNavigator;
