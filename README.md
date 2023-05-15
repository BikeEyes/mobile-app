# BikeEyes App

## 🚀 How to use

### Install dependencies

```bash
npm install
```

###  Prebuild the app to enable native code

Expo does not support Bluetooth in the Expo Go app. To enable Bluetooth, you need to prebuild the app.

```bash
npm run prebuild:android
```

###  Run the app (development mode)

```bash
npm run android
```

### Build the apk

```bash
npm run build:apk
```

## 📝 Notes

- To create a apk build, you need to create a EAS account and have installed the EAS CLI. More info [here](https://docs.expo.dev/build/setup/).
- Some feature are not available for iOS, like open Bluetooth settings.
- There are some leftovers of old name of the project (Open Radar). Sorry for that.

## 📖 Documentation

- [Expo](https://docs.expo.io/)
- [React](https://react.dev)
- [React Native](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
- [Styled Components](https://styled-components.com/docs)
- [React Native Screens](https://github.com/software-mansion/react-native-screens#readme)
- [react-native-size-matters](https://www.npmjs.com/package/react-native-size-matters)
- [With RN Bluetooth Classic](https://kenjdavidson.com/react-native-bluetooth-classic/)
- [React Native Async Storage](https://react-native-async-storage.github.io/async-storage/docs/install/)

### Project structure
```
.
├── assets
├── src/
│   ├── components/
│   │   ├── ConnectionStatus
│   │   └── Flex
│   ├── Context/
│   │   ├── connectionManager
│   │   ├── notifications
│   │   ├── radar
│   │   └── settings
│   ├── navigation/
│   │   ├── Main
│   │   └── Tabs
│   ├── screens/
│   │   ├── devices
│   │   ├── home
│   │   └── settings
│   └── theme
├── app.json
├── eas.json
├── App.tsx
├── babel.config.js
├── index.js
├── metro.config.js
├── package.json
├── README.md
└── tsconfig.json
```

### Context

The app uses React Context to manage the state of the app. The context is divided in four parts:

- connectionManager: Manages the Bluetooth connection with the radar.
- notifications: Manages the notifications.
- settings: Manages the settings of the app.
- radar: Manages the radar data.

### Navigation

The app uses React Navigation to manage the navigation between screens. The navigation is divided in two parts:

- Main: The main navigation (Devices, Tabs)
- Tabs: The bottom tabs navigation (Home, Settings)

### Screens

The app has three screens:

- Devices: Shows the list of paired devices and allows to connect to one of them.
- Home: Visualizes the state of an incoming vehicle, uses sound to notify user.
- Settings: Allows to change the settings of the app.

### Async Storage

The app uses Async Storage to store the settings of the app and the last connected device to autoconnect to it.

## 📝 License

[MIT](./LICENSE)
