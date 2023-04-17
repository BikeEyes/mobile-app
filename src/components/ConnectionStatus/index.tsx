import { memo } from "react";
import {
  ConnectionStatusType,
  ConnectionStatus as ConnectionStatusEnum,
} from "../../connectionManager/module";

import { ConnectionDot, ThemeText } from "./index.styled";

enum StatusStyle {
  DOT = "dot",
  TEXT = "text",
  DOT_TEXT = "dot-text",
}

interface Props {
  connectionStatus: ConnectionStatusType;
  statusStyle?: StatusStyle;
}

export const ConnectionStatus: React.FC<Props> = ({
  connectionStatus,
  statusStyle,
}) => {
  if (statusStyle === StatusStyle.TEXT) {
    return (
      <ThemeText>
        {connectionStatus === ConnectionStatusEnum.CONNECTED
          ? "Connected"
          : "Not connected"}
      </ThemeText>
    );
  }
  if (statusStyle === StatusStyle.DOT) {
    return (
      <ConnectionDot
        isConnected={connectionStatus === ConnectionStatusEnum.CONNECTED}
      />
    );
  }
  return (
    <>
      <ConnectionDot
        isConnected={connectionStatus === ConnectionStatusEnum.CONNECTED}
      />
      <ThemeText>
        {connectionStatus === ConnectionStatusEnum.CONNECTED
          ? "Connected"
          : "Not connected"}
      </ThemeText>
    </>
  );
};

export default memo(ConnectionStatus);
