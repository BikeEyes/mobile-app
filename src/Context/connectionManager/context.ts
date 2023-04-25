import { Dispatch, SetStateAction, createContext } from "react";
import { ConnectionManagerContextProps } from "./module";

export const ConnectionManagerContext = createContext({
  connectionManager: {} as ConnectionManagerContextProps,
  setConnectionManager: {} as Dispatch<
    SetStateAction<ConnectionManagerContextProps>
  >,
});
