import { useCallback, useState } from "react";
import { PermissionsAndroid } from "react-native";

export const useGetBTClassicPermissions = () => {
  const [permission, setPermission] = useState({
    accessFineLocation: false,
    bluetoothConnect: false,
    bluetoothScan: false,
  });
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
    const hasPermission = granted === PermissionsAndroid.RESULTS.GRANTED;
    setPermission({ ...permission, accessFineLocation: hasPermission });
    return hasPermission;
  };

  const requestBluetoothConnectPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Bluetooth connect required for connection",
        message:
          "In order to perform Bluetooth connection, you must enable/allow " +
          "bluetooth connect access.",
        buttonNeutral: 'Ask Me Later"',
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    const hasPermission = granted === PermissionsAndroid.RESULTS.GRANTED;
    setPermission({ ...permission, bluetoothConnect: hasPermission });
    return hasPermission;
  };

  const requestBluetoothScanPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Bluetooth scan required for discovery",
        message:
          "In order to perform Bluetooth scan, you must enable/allow " +
          "bluetooth scan access.",
        buttonNeutral: 'Ask Me Later"',
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    const hasPermission = granted === PermissionsAndroid.RESULTS.GRANTED;
    setPermission({ ...permission, bluetoothScan: hasPermission });
    return hasPermission;
  };

  return useCallback(async () => {
    await requestAccessFineLocationPermission();
    await requestBluetoothConnectPermission();
    await requestBluetoothScanPermission();
    return permission;
  }, [permission]);
};
