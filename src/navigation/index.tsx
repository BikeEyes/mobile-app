import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useNavigationScreens from "./useNavigationScreens";

const RootStack = createNativeStackNavigator();

const Navigator = () => {
  const screens = useNavigationScreens();

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {screens.stack.map((screen) => (
        <RootStack.Screen {...screen} key={screen.name} />
      ))}
    </RootStack.Navigator>
  );
};

export default Navigator;
