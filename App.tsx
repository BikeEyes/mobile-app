import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";

import Navigator from "./src/navigation";
import { useGlobalTheme } from "./src/theme/useGlobalTheme";

export default function App() {
  const globalTheme = useGlobalTheme();

  return (
    <PaperProvider theme={globalTheme}>
      <ThemeProvider theme={globalTheme}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </ThemeProvider>
    </PaperProvider>
  );
}
