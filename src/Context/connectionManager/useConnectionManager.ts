import { useCallback, useContext, useEffect } from "react";
import RNBluetoothClassic, {
  BluetoothEventSubscription,
} from "react-native-bluetooth-classic";
import { RadarContext } from "../radar/context";
import { ConnectionManagerContext } from "./context";

export const useOnDataReceived = () => {
  const { setRadar } = useContext(RadarContext);
  const { connectionManager } = useContext(ConnectionManagerContext);

  const { currentDevice } = connectionManager;

  useEffect(() => {
    let subscription: BluetoothEventSubscription | null = null;

    if (currentDevice)
      subscription = currentDevice.onDataReceived((data) => {
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
      setRadar({
        relativeSpeed: 0,
        distance: 0,
      });
    };
  }, [currentDevice]);
};

export const useGetDeviceIcon = () => {
  return useCallback((deviceName: string) => {
    const possibleDeviceNames = [
      "radar",
      "bikeeyes",
      "bike-eyes",
      "bike_eyes",
      "bikeradar",
      "bike radar",
      "bike-radar",
      "bike_radar",
    ];
    const deviceNameLower = deviceName.toLowerCase();
    deviceNameLower.replace(" ", "-");
    const isRadar = possibleDeviceNames.some((name) =>
      deviceNameLower.includes(name)
    );
    return isRadar ? "radar" : "bluetooth";
  }, []);
};

export const useGetPairedDevices = async () => {
  const { setConnectionManager, connectionManager } = useContext(
    ConnectionManagerContext
  );

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

export const useGetUnpairedDevices = () => {
  const { setConnectionManager, connectionManager } = useContext(
    ConnectionManagerContext
  );

  return useEffect(() => {
    const func = async () => {
      try {
        const unpaired = await RNBluetoothClassic.startDiscovery();
        setConnectionManager((prev) => ({
          ...prev,
          unPairedDevices: unpaired,
        }));
      } catch (error) {
        console.log("Error getting unpaired devices", error);
      }
    };

    func();

    return () => {};
  }, []);
};
