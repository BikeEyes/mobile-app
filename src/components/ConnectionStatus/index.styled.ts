import styled from "styled-components/native";

export const ConnectionDot = styled.View<{ isConnected: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin: 0 5px;
  background-color: ${({ isConnected, theme }) =>
    isConnected
      ? theme.colors.connectionStatus.connected
      : theme.colors.connectionStatus.disconnected};
`;

export const ThemeText = styled.Text`
  color: ${({ theme }) => theme.colors.onBackground};
`;
