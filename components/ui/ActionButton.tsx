import { BASIC } from "@/styles/basicStyles";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ButtonType = {
  text: string;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
};

const ICON_COLOR = {
  primary: "#ff7b28",
  secondary: "#FFF",
  danger: "#FFF",
};

export default function ActionButton({
  text,
  icon,
  onPress,
  variant = "primary",
}: ButtonType) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles[variant], styles.block, BASIC.littleShadow]}
      activeOpacity={0.8}
    >
      <View style={styles.center}>
        {icon && <Ionicons name={icon} size={24} color={ICON_COLOR[variant]} />}
        <Text style={textStyle[variant]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const textStyle = StyleSheet.create({
  primary: {
    color: "#000",
  },
  secondary: {
    color: "#FFF",
  },
  danger: {
    color: "#FFF",
  },
});

const styles = StyleSheet.create({
  block: {
    padding: 18,
    borderRadius: 16,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  primary: {
    backgroundColor: "#FFF",
  },
  secondary: {
    backgroundColor: "#ff7b28",
  },
  danger: {
    backgroundColor: "#ff2f28",
  },
  center: {
    width: "100%",
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
