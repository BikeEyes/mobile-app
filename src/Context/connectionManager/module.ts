import { BluetoothDevice } from "react-native-bluetooth-classic";

export enum ConnectionStatus {
  CONNECTED = "connected",
  DISCONNECTED = "disconnected",
}

export class CustomBluetoothDevice extends BluetoothDevice {
  icon?: string;
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
  pairedDevices: CustomBluetoothDevice[];
  unPairedDevices: CustomBluetoothDevice[];
  currentDevice: CustomBluetoothDevice | null;
}
