import { useMemo } from "react";
import { useColorScheme } from "react-native";
import DarkTheme from "./dark";
import LightTheme from "./light";

export const useGlobalTheme = () => {
  const colorScheme = useColorScheme();

  return useMemo(() => {
    return colorScheme === "dark" ? DarkTheme : LightTheme;
  }, [colorScheme]);
};
