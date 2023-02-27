import { View, Text, FlatList } from "react-native";
import { StyleSheet } from "react-native";
import RNBluetoothClassic, {
  BluetoothDevice,
  BluetoothDeviceEvent,
  BluetoothNativeDevice,
} from "react-native-bluetooth-classic";
import { PermissionsAndroid } from "react-native";
import { useEffect, useState } from "react";
import { Button, TextInput } from "react-native-paper";

const SettingsScreen = () => {
  const [connection, setConnection] = useState(null);
  const [device, setDevice] = useState<BluetoothDevice>(null);
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);

  const requestAccessFineLocationPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Access fine location required for discovery",
        message:
          "In order to perform discovery, you must enable/allow " +
          "fine location access.",
        buttonNeutral: 'Ask Me Later"',
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const startDiscovery = async () => {
    console.log(`Starting discovery...`);
    try {
      const granted = await requestAccessFineLocationPermission();
      const paired = await RNBluetoothClassic.getBondedDevices();

      setDevices(paired);

      if (!granted) {
        throw new Error(`Access fine location was not granted`);
      }

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
      }
    );
    const sub2 = RNBluetoothClassic.onDeviceDisconnected(
      (event: BluetoothDeviceEvent | BluetoothNativeDevice) => {
        console.log(
          `Device disconnected: ${(event as BluetoothNativeDevice).name}`
        );
        setConnection(false);
        setDevice(null);
      }
    );

    return () => {
      sub1.remove();
      sub2.remove();
    };
  }, []);

  // useEffect(() => {
  //   if (connection && device) {
  //     device.onDataReceived((data) => {
  //       console.log(`Received data: ${data}`);
  //     });
  //   }
  // }, [connection, device]);

  const [last, setLast] = useState(0);

  // useEffect(() => {
  //   device?.onDataReceived((data) => {
  //     console.log(`Received data: ${data}`);
  //   });
  // }, [device]);

  const renderItem = ({ item }: { item: BluetoothDevice }) => {
    return (
      <View style={styles.listItem}>
        <Text>{item.name}</Text>
        <Button
          mode="contained"
          onPress={() => {
            item
              .connect()
              .then((connection) => {
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

  const [message, setMessage] = useState<string>("");

  const send = () => {
    device?.write(message).then((data) => {
      console.log("Message sent");
      setMessage("");
    });
  };

  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
      <FlatList renderItem={renderItem} data={devices}></FlatList>

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
      <View style={styles.currentDevice}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <Button mode="contained" onPress={send}>
          Send
        </Button>
      </View>
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
