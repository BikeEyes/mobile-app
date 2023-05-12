import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.carContainer};
  height: 100%;
`;

export const ConnectionStatusContainer = styled.View<{ isConnected: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 32px;
  background-color: ${({ isConnected }) =>
    isConnected ? "#00ff00" : "#ff0000"};
`;

export const BikerContainer = styled.View<{
  status: string;
}>`
  flex: 1;
  align-items: center;
  justify-content: center;
  max-height: 10%;
  background-color: ${({ status }) => status};
`;

export const CarViewContainer = styled.View`
  flex: 1;
  align-items: center;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.carContainer};
`;

export const RoadContainer = styled.View`
  flex: 1;
  height: 100%;
  width: 56px;
  position: absolute;
  border-left-width: 2px;
  border-right-width: 2px;
  border-color: ${({ theme }) => theme.colors.onSecondaryContainer};
`;

export const Car = styled.View<{
  distance: number;
}>`
  flex: 1;
  flex-direction: row;
  width: 100%;
  position: absolute;
  justify-content: center;
  top: ${({ distance }) => distance}%;
  color: ${({ theme }) => theme.colors.onSecondaryContainer};
`;

export const TextContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const CarText = styled.Text`
  flex: 1;
  color: ${({ theme }) => theme.colors.onSecondaryContainer};
  font-size: 30px;
  font-weight: bold;
  align-self: center;
  text-align: center;
`;

export const CarIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.onSecondaryContainer};
  font-size: 48px;
`;

export const CyclistIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.onSecondaryContainer};
  font-size: 48px;
`;
