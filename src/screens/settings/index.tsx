import { View, Text, FlatList } from "react-native";
import { StyleSheet } from "react-native";
import RNBluetoothClassic, {
  BluetoothDevice,
  BluetoothDeviceEvent,
  BluetoothEventSubscription,
  BluetoothNativeDevice,
} from "react-native-bluetooth-classic";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../navigation/routes";
import { ConnectionManagerContext } from "../../Context/connectionManager/context";
import { RadarContext } from "../../Context/radar/context";

const SettingsScreen = ({}) => {
  const navigation = useNavigation();
  const { connectionManager, setConnectionManager } = useContext(
    ConnectionManagerContext
  );
  const { setRadar } = useContext(RadarContext);
  const [connection, setConnection] = useState(null);
  const [device, setDevice] = useState<BluetoothDevice>(null);
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);

  const startDiscovery = async () => {
    console.log(`Starting discovery...`);
    try {
      const paired = await RNBluetoothClassic.getBondedDevices();

      setDevices(paired);

      try {
        const unpaired = await RNBluetoothClassic.startDiscovery();

        console.log(`Found ${unpaired.length} unpaired devices.`);
      } finally {
      }
    } catch (err) {
      console.log(`Error discovering devices: ${err.message}`);
    }
  };

  useEffect(() => {
    const sub1 = RNBluetoothClassic.onDeviceConnected(
      (event: BluetoothDeviceEvent | BluetoothNativeDevice) => {
        console.log(
          `Device connected: ${(event as BluetoothNativeDevice).name}`
        );
        setConnection(true);
        setConnectionManager({ ...connectionManager, isConnected: true });
      }
    );
    const sub2 = RNBluetoothClassic.onDeviceDisconnected(
      (event: BluetoothDeviceEvent | BluetoothNativeDevice) => {
        console.log(
          `Device disconnected: ${(event as BluetoothNativeDevice).name}`
        );
        setConnection(false);
        setDevice(null);

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

  useEffect(() => {
    let subscription: BluetoothEventSubscription | null = null;

    if (device)
      subscription = device.onDataReceived((data) => {
        console.log(`Data received: ${data.data}`);
        const values = data.data;
        if (!values)
          setRadar({
            relativeSpeed: 0,
            distance: 0,
          });
        else {
          const [distance, relativeSpeed] = values.split(",");
          setRadar({
            relativeSpeed: Number(relativeSpeed),
            distance: Number(distance),
          });
        }
      });

    return () => {
      subscription?.remove();
    };
  }, [device]);

  const renderItem = ({ item }: { item: BluetoothDevice }) => {
    return (
      <View style={styles.listItem}>
        <Text>{item.name}</Text>
        <Button
          mode="contained"
          onPress={() => {
            item
              .connect({})
              .then((connection) => {
                setConnectionManager((prev) => ({
                  ...prev,
                  isConnected: true,
                }));
                setConnection(true);
                setDevice(item);
              })
              .catch((error) => {
                console.log(`Error connecting to device: ${error.message}`);
                setConnection(false);
                setDevice(null);
              });
          }}
          buttonColor="green"
        >
          Connect
        </Button>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList renderItem={renderItem} data={devices} />

      <View style={styles.currentDevice}>
        <Text>Connected to:</Text>
        <Text>{device && device.name}</Text>
        <Button
          mode="contained"
          buttonColor="red"
          onPress={() =>
            device
              ?.disconnect()
              .then(() => {
                setConnection(false);
                setDevice(null);
              })
              .catch((error) => console.log(error))
          }
        >
          Disconnect
        </Button>
      </View>
      <View style={styles.currentDevice}>
        <Button mode="contained" onPress={startDiscovery}>
          Start discovery
        </Button>
        <Button
          mode="contained"
          onPress={async () => {
            await RNBluetoothClassic.cancelDiscovery();
          }}
        >
          Stop discovery
        </Button>
      </View>
      <Button
        onPress={() => {
          device
            ?.write("Hello world!")
            .then(() => {
              console.log(`Data sent.`);
            })
            .catch((error) => {
              console.log(`Error sending data: ${error.message}`);
            });
        }}
      >
        Send
      </Button>
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate(Routes.BT_DEVICES as never);
        }}
      >
        OPEN SETTINGS
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  currentDevice: {
    flex: 1,
    maxWidth: "100%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  input: {
    width: "80%",
  },
  listItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "#ccc",
    borderColor: "black",
    borderWidth: 1,
  },
});
export default SettingsScreen;
