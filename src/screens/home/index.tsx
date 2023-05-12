import { useContext, useEffect, useMemo, useState } from "react";
import * as s from "./index.styled";
import ConnectionStatus from "../../components/ConnectionStatus";
import { ConnectionStatus as ConnectionStatusEnum } from "../../Context/connectionManager/module";
import { FlexRow } from "../../components/Flex";
import { RadarContext } from "../../Context/radar/context";
import { ConnectionManagerContext } from "../../Context/connectionManager/context";
import { useOnDataReceived } from "../../Context/connectionManager/useConnectionManager";
import { useKeepAwake } from "expo-keep-awake";
import { Audio } from "expo-av";
import { SettingsContext } from "../../Context/settings/context";

const HomeScreen = () => {
  useKeepAwake();
  useOnDataReceived();

  const { radar } = useContext(RadarContext);
  const [lastDistance, setLastDistance] = useState<number>(0);
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
  const { connectionManager } = useContext(ConnectionManagerContext);
  const { settings } = useContext(SettingsContext);
  const { isConnected } = connectionManager;
  const { relativeSpeed, distance } = radar;

  const carPosition = useMemo(() => {
    const MAX_DST = 30;
    if (distance >= MAX_DST) return 93;
    else return 5 + (distance / MAX_DST) * 88;
  }, [distance]);

  const playSound = async () => {
    const { sound: s } = await Audio.Sound.createAsync(
      require("../../../assets/sound.mp3")
    );
    setSound(s);
    await sound.playAsync();
  };

  useEffect(() => {
    if (lastDistance - distance < 0 && settings.enableSounds) {
      playSound()
        .then(() => {})
        .catch((e) => {
          console.log("Audio error: ", e.message);
        });
    }
    setLastDistance(distance);
  }, [distance, settings.enableSounds]);

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, []);

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
          <>
            <s.Car distance={carPosition}>
              <s.CarIcon name="car" size={48} />
            </s.Car>
            <s.TextContainer>
              <s.CarText>{relativeSpeed} km/h</s.CarText>
              <s.CarText>{distance} m</s.CarText>
            </s.TextContainer>
          </>
        )}
      </s.CarViewContainer>
    </s.Container>
  );
};

export default HomeScreen;
