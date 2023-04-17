import { useMemo, useState } from "react";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as s from "./index.styled";
import ConnectionStatus from "../../components/ConnectionStatus";
import { ConnectionStatus as ConnectionStatusEnum } from "../../connectionManager/module";
import { FlexRow } from "../../components/Flex";

const HomeScreen = () => {
  const [data, setData] = useState({
    distance: 40,
    relSpeed: 120,
  });

  const bikerStatus = useMemo(() => {
    if (data.relSpeed >= 50) {
      return "#ff0000";
    }
    if (data.distance < 25 && data.relSpeed < 50) {
      return "#ffaa00";
    }
    return "#00ff00";
  }, [data]);

  const carPosition = useMemo(() => {
    return data.distance * 2 * 0.9;
  }, []);

  return (
    <s.Container>
      <FlexRow>
        <ConnectionStatus connectionStatus={ConnectionStatusEnum.CONNECTED} />
      </FlexRow>
      <s.BikerContainer status={bikerStatus}>
        <Icon name="bicycle" size={48} />
      </s.BikerContainer>

      <s.CarViewContainer>
        <s.RoadContainer></s.RoadContainer>
        <s.Car distance={carPosition}>
          <s.CarText>{data.relSpeed} km/h</s.CarText>
          <Icon name="car" size={48} color={"white"} />
          <s.CarText>{data.distance} m</s.CarText>
        </s.Car>
      </s.CarViewContainer>
    </s.Container>
  );
};

export default HomeScreen;
