import { Provider as PaperProvider, Snackbar } from "react-native-paper";
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
import { enableFreeze, enableScreens } from "react-native-screens";
import { SettingsContext } from "./src/Context/settings/context";
import { defaultSettings } from "./src/Context/settings/module";
import {
  NotificationTypes,
  defaultNotification,
} from "./src/Context/notifications/module";
import { NotificationContext } from "./src/Context/notifications/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

enableFreeze(true);
enableScreens(true);

export default function App() {
  const requestPermissions = useGetBTClassicPermissions();
  const globalTheme = useGlobalTheme();

  const [connectionManager, setConnectionManager] = useState(CMDefaultState);
  const [radar, setRadar] = useState(RCDefaultState);
  const [settings, setSettings] = useState(defaultSettings);
  const [notification, setNotification] = useState(defaultNotification);

  const onDismissSnackBar = () =>
    setNotification({ ...notification, active: false });

  useEffect(() => {
    requestPermissions();

    AsyncStorage.getItem("settings").then((res) => {
      if (res) {
        setSettings({ ...settings, ...JSON.parse(res) });
      }
    });
  }, []);

  useEffect(() => {
    if (connectionManager.isConnected) {
      setNotification({
        message: `Connected to ${connectionManager.currentDevice?.name}`,
        active: true,
        type: NotificationTypes.success,
      });
      AsyncStorage.setItem("device", connectionManager.currentDevice?.address)
        .then(() => {
          console.log("Saved last device");
        })
        .catch((e) => {
          console.log("Error saving last device", e);
        });
    }
  }, [connectionManager.isConnected]);

  return (
    <PaperProvider theme={globalTheme}>
      <ThemeProvider theme={globalTheme}>
        <NavigationContainer>
          <SettingsContext.Provider value={{ setSettings, settings }}>
            <NotificationContext.Provider
              value={{ notification, setNotification }}
            >
              <ConnectionManagerContext.Provider
                value={{ connectionManager, setConnectionManager }}
              >
                <RadarContext.Provider value={{ radar, setRadar }}>
                  <Navigator />
                  <Snackbar
                    visible={notification.active}
                    onDismiss={onDismissSnackBar}
                    duration={3000}
                  >
                    {notification.message}
                  </Snackbar>
                </RadarContext.Provider>
              </ConnectionManagerContext.Provider>
            </NotificationContext.Provider>
          </SettingsContext.Provider>
        </NavigationContainer>
      </ThemeProvider>
    </PaperProvider>
  );
}
