export enum ConnectionStatus {
  CONNECTED = "connected",
  DISCONNECTED = "disconnected",
}

export type ConnectionStatusType =
  typeof ConnectionStatus[keyof typeof ConnectionStatus];
