import { useCallback, useMemo, useState } from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as s from "./styles";

const HomeScreen = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [data, setData] = useState({
    distance: 15,
    relSpeed: 40,
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
      <s.ConnectionStatusContainer isConnected={isConnected}>
        {!isConnected && (
          <SafeAreaView>
            <Text>Not connected</Text>
          </SafeAreaView>
        )}
      </s.ConnectionStatusContainer>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
