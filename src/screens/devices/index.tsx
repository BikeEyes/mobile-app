import { memo, useContext, useEffect, useMemo } from "react";
import { View, Text, FlatList } from "react-native";
import { ConnectionManagerContext } from "../../Context/connectionManager/context";
import { RadarContext } from "../../Context/radar/context";
import { List } from "react-native-paper";
import { CustomBluetoothDevice } from "../../Context/connectionManager/module";

const Devices = () => {
  const { connectionManager, setConnectionManager } = useContext(
    ConnectionManagerContext
  );

  const { currentDevice } = connectionManager;

  const data = useMemo(() => {
    return connectionManager.pairedDevices.map((device) => {
      return {
        ...device,
        isCurrent: device.address === currentDevice?.address,
      };
    });
  }, [connectionManager.pairedDevices, currentDevice]);

  interface RenderDeviceProps extends CustomBluetoothDevice {
    isCurrent: boolean;
  }

  const RenderDevice = ({ item }: { item: RenderDeviceProps }) => {
    return (
      <List.Item
        title={item.name}
        description={item.address}
        key={item.id}
        left={(props) => (
          <List.Icon {...props} icon={item.icon ? item.icon : "bluetooth"} />
        )}
        right={(props) => (
          <List.Icon {...props} icon={item.isCurrent ? "link-off" : ""} />
        )}
      />
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        // @ts-ignore TODO: Fix type error
        renderItem={RenderDevice}
        keyExtractor={(item) => item.id}
        extraData={currentDevice}
      />
    </View>
  );
};

export default Devices;
