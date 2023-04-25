import { Dispatch, SetStateAction, createContext } from "react";
import { RadarContextProps } from "./module";

export const RadarContext = createContext({
  radar: {} as RadarContextProps,
  setRadar: {} as Dispatch<SetStateAction<RadarContextProps>>,
});
