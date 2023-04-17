import { createContext } from "react";

export const ConnectionManager = createContext({
  isConnected: false,
  foundDevices: [],
  currentDevice: null,
});
