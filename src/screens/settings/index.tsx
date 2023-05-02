import RNBluetoothClassic, {
  BluetoothDeviceEvent,
  BluetoothNativeDevice,
} from "react-native-bluetooth-classic";
import { useContext, useEffect } from "react";
import { Button, List, Switch } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../navigation/routes";
import { ConnectionManagerContext } from "../../Context/connectionManager/context";
import { RadarContext } from "../../Context/radar/context";
import { useGetPairedDevices } from "../../Context/connectionManager/useConnectionManager";
import * as s from "./index.styled";

const SettingsScreen = ({}) => {
  useGetPairedDevices();

  const navigation = useNavigation();
  const { connectionManager, setConnectionManager } = useContext(
    ConnectionManagerContext
  );
  const { setRadar } = useContext(RadarContext);

  useEffect(() => {
    const sub1 = RNBluetoothClassic.onDeviceConnected(
      (event: BluetoothDeviceEvent | BluetoothNativeDevice) => {
        console.log(
          `Device connected: ${(event as BluetoothNativeDevice).name}`
        );
        setConnectionManager({ ...connectionManager, isConnected: true });
      }
    );
    const sub2 = RNBluetoothClassic.onDeviceDisconnected(
      (event: BluetoothDeviceEvent | BluetoothNativeDevice) => {
        console.log(
          `Device disconnected: ${(event as BluetoothNativeDevice).name}`
        );

        setRadar((prev) => ({
          ...prev,
          relativeSpeed: 0,
          distance: 0,
        }));

        setConnectionManager({
          ...connectionManager,
          currentDevice: null,
          isConnected: false,
        });
      }
    );

    return () => {
      sub1.remove();
      sub2.remove();
    };
  }, []);

  return (
    <s.Container>
      <s.Title>Settings</s.Title>
      <List.Section>
        <List.Item
          left={(props) => <List.Icon {...props} icon="plus" />}
          title="Pair new device"
        />
        <List.Subheader>Saved devices</List.Subheader>
        <List.Item
          left={(props) => <List.Icon {...props} icon="chevron-right" />}
          title="See all"
          description="Show already paired bluetooth devices"
          onPress={() => {
            navigation.navigate(Routes.BT_DEVICES as never);
          }}
        />

        <s.CustomDivider bold horizontalInset />
      </List.Section>
      <List.Section>
        <List.Subheader>Other options</List.Subheader>
        <List.Item
          title="Connect automatically"
          description="Connect to the last paired device on startup"
          right={(props) => <Switch />}
        />
        <List.Item
          title="Enable sounds"
          description="Enable sounds when a vehicle is detected"
          right={(props) => <Switch />}
        />
        <List.Item
          title="Dark mode"
          description="Enable dark mode"
          right={(props) => <Switch />}
        />
      </List.Section>
    </s.Container>
  );
};

export default SettingsScreen;
