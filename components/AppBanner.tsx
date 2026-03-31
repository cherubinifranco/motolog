import { Ionicons } from "@expo/vector-icons";
import {
    StyleSheet,
    Text,
    View
} from "react-native";

export default function AppBanner() {
  return (
    <View style={styles.logoContainer}>
      <Ionicons name="bicycle" size={32} color="#FF6200" />
      <Text style={styles.appName}>
        Moto
        <Text style={styles.accent}>Log</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  appName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111",
  },
  accent: {
    color: "#FF6200",
  },
});
