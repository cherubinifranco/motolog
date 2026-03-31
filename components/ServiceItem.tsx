import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type ServiceItemProps = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  kmRemaining: number;
  changeAt: number;
};

const getColorByKm = (km: number) => {
  if (km < 500) return "#EF4444";
  if (km < 1000) return "#F97316";
  return "#22C55E";
};

export function ServiceItem({
  icon,
  title,
  kmRemaining,
  changeAt,
}: ServiceItemProps) {
  const color = getColorByKm(kmRemaining);

  return (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <Ionicons name={icon} size={24} color={color} />

        <View style={styles.cardInfo}>
          <View>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text
              style={
                kmRemaining <= 0 ? styles.cardSubtitleRed : styles.cardSubtitle
              }
            >
              {kmRemaining <= 0
                ? `${(kmRemaining * -1).toLocaleString()} km pasados`
                : `${kmRemaining.toLocaleString()} km restantes`}
            </Text>
          </View>
          {kmRemaining <= 0 && (
            <Ionicons name="alert-circle" size={24} color="#EF4444" />
          )}
        </View>
      </View>
    </View>
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
