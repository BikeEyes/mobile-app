import RNBluetoothClassic, {
  BluetoothDeviceEvent,
  BluetoothNativeDevice,
} from "react-native-bluetooth-classic";
import { useContext, useEffect, useState } from "react";
import { Banner, List, Switch } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../navigation/routes";
import { ConnectionManagerContext } from "../../Context/connectionManager/context";
import { RadarContext } from "../../Context/radar/context";
import * as s from "./index.styled";
import { SettingsContext } from "../../Context/settings/context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { NotificationTypes } from "../../Context/notifications/module";
import { NotificationContext } from "../../Context/notifications/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsScreen = ({}) => {
  const { settings, setSettings } = useContext(SettingsContext);
  const { connectionManager, setConnectionManager } = useContext(
    ConnectionManagerContext
  );
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);
  const navigation = useNavigation();
  const { setNotification } = useContext(NotificationContext);

  const { setRadar } = useContext(RadarContext);

  const getPairedDevices = async () => {
    try {
      const paired = await RNBluetoothClassic.getBondedDevices();
      setConnectionManager((prev) => ({
        ...prev,
        pairedDevices: paired,
      }));
    } catch (error) {
      console.log("Error getting paired devices", error);
    }
  };

  useEffect(() => {
    AsyncStorage.setItem("settings", JSON.stringify(settings))
      .then(() => {
        setNotification({
          message: "Settings saved",
          active: true,
          type: NotificationTypes.success,
        });
      })
      .catch((e) => {
        setNotification({
          message: `Error saving settings ${e}`,
          active: true,
          type: NotificationTypes.error,
        });
      });
  }, [settings]);

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

    RNBluetoothClassic.isBluetoothEnabled().then(async (enabled) => {
      setBluetoothEnabled(enabled);
      await getPairedDevices();
    });

    const sub3 = RNBluetoothClassic.onBluetoothEnabled(async (event) => {
      setBluetoothEnabled(event.enabled);
      await getPairedDevices();
    });

    return () => {
      sub1.remove();
      sub2.remove();
      sub3.remove();
    };
  }, []);

  useEffect(() => {
    const connectDevice = async () => {
      try {
        const deviceAddr = await AsyncStorage.getItem("device");
        if (deviceAddr) {
          const device = connectionManager.pairedDevices.find(
            (d) => d.address === deviceAddr
          );
          if (device) {
            await device.connect();
            setConnectionManager({
              ...connectionManager,
              currentDevice: device,
              isConnected: true,
            });
          }
        }
      } catch (error) {
        setNotification({
          active: true,
          message: `Error connecting to device: ${error.message}`,
          type: NotificationTypes.error,
        });
      }
    };

    if (bluetoothEnabled && connectionManager.pairedDevices.length > 0) {
      if (settings.autoConnect) {
        connectDevice();
      }
    }
  }, [bluetoothEnabled, connectionManager.pairedDevices]);

  return (
    <s.Container>
      <s.Title>Settings</s.Title>
      <Banner
        visible={!bluetoothEnabled}
        actions={[
          {
            label: "Open settings",
            onPress: () => RNBluetoothClassic.openBluetoothSettings(),
          },
        ]}
        icon={({ size }) => <Icon name="alert" size={size} />}
      >
        You have bluetooth turned off. Turn it on to connect to a device. Then
        you can connect to the device from the list below.
      </Banner>
      <List.Section>
        <List.Item
          left={(props) => <List.Icon {...props} icon="plus" />}
          title="Pair new device"
          onPress={() => {
            RNBluetoothClassic.openBluetoothSettings();
          }}
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
          right={(props) => (
            <Switch
              value={settings.autoConnect}
              onValueChange={() =>
                setSettings({ ...settings, autoConnect: !settings.autoConnect })
              }
            />
          )}
        />
        <List.Item
          title="Enable sounds"
          description="Enable sounds when a vehicle is detected"
          right={(props) => (
            <Switch
              value={settings.enableSounds}
              onValueChange={() =>
                setSettings({
                  ...settings,
                  enableSounds: !settings.enableSounds,
                })
              }
            />
          )}
        />
      </List.Section>
    </s.Container>
  );
};

export default SettingsScreen;
