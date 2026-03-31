import { useBikeContext } from "@/context/BikeContext";
import { useServicesItems } from "@/hooks/useServicesItems";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ServicesBlockToConfig() {
  const { selectedBike } = useBikeContext();
  const { items, loading } = useServicesItems();
  const bikeId = selectedBike?.id;

  if (selectedBike == null) return null;

  if (loading) return <Text>Loading...</Text>;

  return (
    <View>
      {items.map((service) => (
        <View style={styles.card} key={service.id}>
          <View style={styles.cardRow}>
            <Ionicons name={service.icon} size={24} color={"#6352ff"} />

            <View style={styles.cardInfo}>
              <View>
                <Text style={styles.cardTitle}>{service.title}</Text>
                <Text style={styles.cardSubtitle}>
                  Cada {service.changeEvery} km
                </Text>
              </View>
              <TouchableOpacity style={styles.toggleActive}>
                <Ionicons name="options" size={24} color="#6352ff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
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
  toggleActive: {
    padding: 4,
  },
});
