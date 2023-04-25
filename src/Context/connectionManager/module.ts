import { BluetoothDevice } from "react-native-bluetooth-classic";

export enum ConnectionStatus {
  CONNECTED = "connected",
  DISCONNECTED = "disconnected",
}

export type ConnectionStatusType =
  (typeof ConnectionStatus)[keyof typeof ConnectionStatus];

export const CMDefaultState: ConnectionManagerContextProps = {
  isConnected: false,
  pairedDevices: [],
  unPairedDevices: [],
  currentDevice: null,
};
export interface ConnectionManagerContextProps {
  isConnected: boolean;
  pairedDevices: BluetoothDevice[];
  unPairedDevices: BluetoothDevice[];
  currentDevice: BluetoothDevice | null;
}
