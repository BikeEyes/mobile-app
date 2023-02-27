import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import Navigator from "./src/navigation";

import { BleManagerContext } from "./src/ble/bleManagerContext";

export default function App() {
  const DarkTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#000",
      text: "#fff",
    },
  };

  return (
    <BleManagerContext.Provider value={null}>
      <PaperProvider>
        <NavigationContainer theme={DarkTheme}>
          <Navigator />
        </NavigationContainer>
      </PaperProvider>
    </BleManagerContext.Provider>
  );
}
