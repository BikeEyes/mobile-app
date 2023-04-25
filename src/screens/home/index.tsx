import { useContext, useMemo, useState } from "react";
import * as s from "./index.styled";
import ConnectionStatus from "../../components/ConnectionStatus";
import { ConnectionStatus as ConnectionStatusEnum } from "../../Context/connectionManager/module";
import { FlexRow } from "../../components/Flex";
import { RadarContext } from "../../Context/radar/context";
import { ConnectionManagerContext } from "../../Context/connectionManager/context";

const HomeScreen = () => {
  const { radar } = useContext(RadarContext);
  const { connectionManager } = useContext(ConnectionManagerContext);
  const { isConnected } = connectionManager;
  const { relativeSpeed, distance } = radar;

  console.log(isConnected);

  const carPosition = useMemo(() => {
    const MAX_DST = 30;
    if (distance >= MAX_DST) return 93;
    else return 5 + (distance / MAX_DST) * 88;
  }, [distance]);

  return (
    <s.Container>
      <FlexRow>
        <ConnectionStatus
          connectionStatus={
            isConnected
              ? ConnectionStatusEnum.CONNECTED
              : ConnectionStatusEnum.DISCONNECTED
          }
        />
      </FlexRow>
      <s.CarViewContainer>
        <s.RoadContainer />
        <s.CyclistIcon name="bicycle" size={48} />
        {distance > 0 && (
          <s.Car distance={carPosition}>
            <s.CarText>{relativeSpeed} km/h</s.CarText>
            <s.CarIcon name="car" size={48} />
            <s.CarText>{distance} m</s.CarText>
          </s.Car>
        )}
      </s.CarViewContainer>
    </s.Container>
  );
};

export default HomeScreen;
