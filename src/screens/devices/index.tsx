import { useContext, useMemo, useState } from "react";
import { View, FlatList } from "react-native";
import { ConnectionManagerContext } from "../../Context/connectionManager/context";
import { List } from "react-native-paper";
import { CustomBluetoothDevice } from "../../Context/connectionManager/module";
import RNBluetoothClassic, {
  BluetoothDevice,
} from "react-native-bluetooth-classic";
import { useGetDeviceIcon } from "../../Context/connectionManager/useConnectionManager";

const Devices = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { connectionManager, setConnectionManager } = useContext(
    ConnectionManagerContext
  );

  const { currentDevice } = connectionManager;

  const getIcon = useGetDeviceIcon();

  const RenderDevice = ({
    item,
    icon,
    isCurrent,
  }: {
    item: CustomBluetoothDevice;
    icon: string;
    isCurrent: boolean;
  }) => {
    const action = async () => {
      try {
        if (isCurrent) {
          console.log(`Disconnecting from device: ${item.name}`);
          await item.disconnect();

          setConnectionManager({
            ...connectionManager,
            currentDevice: null,
            isConnected: false,
          });
        } else {
          console.log(`Connecting to device: ${item.name}`);
          const connected = await item.connect();
          if (connected) {
            setConnectionManager({
              ...connectionManager,
              currentDevice: item,
              isConnected: true,
            });
          }
        }
      } catch (err) {
        console.log(`Error connecting to device: ${err.message}`);
      }
    };

    return (
      <List.Item
        title={item.name}
        description={item.address}
        key={item.id}
        onPress={action}
        left={(props) => <List.Icon {...props} icon={icon} />}
        right={(props) => (
          <List.Icon {...props} icon={isCurrent ? "link-off" : ""} />
        )}
      />
    );
  };

  return (
    <View>
      <FlatList
        data={connectionManager.pairedDevices}
        // @ts-ignore TODO: Fix this type error
        renderItem={({ item }) =>
          RenderDevice({
            item,
            icon: getIcon(item.name),
            isCurrent: item.address === currentDevice?.address,
          })
        }
        keyExtractor={(item) => item.id}
        onRefresh={async () => {
          setRefreshing(true);
          try {
            const paired = await RNBluetoothClassic.getBondedDevices();
            setConnectionManager((prev) => ({
              ...prev,
              pairedDevices: paired,
            }));
          } catch (error) {
            console.log("Error getting paired devices", error);
          }
          setRefreshing(false);
        }}
        refreshing={refreshing}
      />
    </View>
  );
};

export default Devices;
