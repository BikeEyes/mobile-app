import { Dispatch, SetStateAction, createContext } from "react";
import { SettingsContextProps } from "./module";

export const SettingsContext = createContext({
  settings: {} as SettingsContextProps,
  setSettings: {} as Dispatch<SetStateAction<SettingsContextProps>>,
});
