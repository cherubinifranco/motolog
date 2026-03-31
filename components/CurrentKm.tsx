import { useBikeContext } from "@/context/BikeContext";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CurrentKm() {
  const { selectedBike } = useBikeContext();

  if (!selectedBike) return null;

  return (
    <View style={styles.kmCard}>
      <View style={styles.kmRow}>
        <View>
          <Text style={styles.kmLabel}>Kilometraje actual</Text>
          <Text style={styles.kmValue}>{selectedBike.currentKm}</Text>
        </View>
        <TouchableOpacity style={styles.actualizarButton}>
          <Text style={styles.actualizarText}>Actualizar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  kmCard: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  kmRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  kmLabel: {
    fontSize: 15,
    color: "#666",
  },
  kmValue: {
    fontSize: 32,
    fontWeight: "700",
    color: "#111",
  },
  actualizarButton: {
    backgroundColor: "#FF6200",
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 12,
  },
  actualizarText: {
    color: "#FFF",
    fontWeight: "600",
  },
});
