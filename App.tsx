import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";

import Navigator from "./src/navigation";
import { useGlobalTheme } from "./src/theme/useGlobalTheme";
import { useGetBTClassicPermissions } from "./src/Context/connectionManager/useGetBTClassicPermissions";
import { useEffect, useState } from "react";
import { ConnectionManagerContext } from "./src/Context/connectionManager/context";
import { CMDefaultState } from "./src/Context/connectionManager/module";
import { RCDefaultState } from "./src/Context/radar/module";
import { RadarContext } from "./src/Context/radar/context";

export default function App() {
  const globalTheme = useGlobalTheme();
  const requestPermissions = useGetBTClassicPermissions();
  const [connectionManager, setConnectionManager] = useState(CMDefaultState);
  const [radar, setRadar] = useState(RCDefaultState);

  useEffect(() => {
    requestPermissions();
  }, []);

  return (
    <PaperProvider theme={globalTheme}>
      <ThemeProvider theme={globalTheme}>
        <NavigationContainer>
          <ConnectionManagerContext.Provider
            value={{ connectionManager, setConnectionManager }}
          >
            <RadarContext.Provider value={{ radar, setRadar }}>
              <Navigator />
            </RadarContext.Provider>
          </ConnectionManagerContext.Provider>
        </NavigationContainer>
      </ThemeProvider>
    </PaperProvider>
  );
}
