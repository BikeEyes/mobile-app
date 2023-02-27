import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
const AnalyticsScreen = () => (
  <View style={styles.container}>
    <Text>Analytics Screen</Text>
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AnalyticsScreen;
