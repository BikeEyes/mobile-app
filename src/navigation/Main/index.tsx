import useNavigationScreens from "./useNavigationScreens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const MainStack = createNativeStackNavigator();

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
