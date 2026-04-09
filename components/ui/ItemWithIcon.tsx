import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ItemProps = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  iconColor?: "green" | "blue" | "red" | "orange";
  title: string;
  onPress?: () => void;
  subtitle?: string;
};

const COLORS = {
  green: "#22C55E",
  blue: "#6352ff",
  red: "#EF4444",
  orange: "#F97316",
};

export function ItemWithIcon({
  icon = "alert-circle",
  iconColor = "blue",
  title = "title",
  subtitle = "",
  onPress,
}: ItemProps) {
  const color = COLORS[iconColor];

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.card}>
      <View style={styles.cardRow}>
        <Ionicons name={icon} size={24} color={color} />

        <View style={styles.cardInfo}>
          <View>
            <Text style={styles.cardTitle}>{title}</Text>
            {subtitle && <Text>{subtitle}</Text>}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  cardInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  cardSubtitleRed: {
    fontSize: 14,
    color: "#EF4444",
    fontWeight: "500",
  },
  progressRing: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 4,
  },
});
