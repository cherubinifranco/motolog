import { useServiceContext } from "@/context/ServiceContext";
import { Service } from "@/types/Service";
import { ServiceLog } from "@/types/ServiceLog";
import { formatShortDate } from "@/utils/formatText";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LogItem({
  item,
}: {
  item: ServiceLog & { service?: Service };
}) {
  const { services } = useServiceContext();

  const service = services.find((s) => s.id === item.serviceId) || {
    title: "Lost",
    icon: "accessibility",
  };

  return (
    <View key={item.id} style={styles.historialCard}>
      <View style={styles.cardHeader}>
        <View style={styles.row}>
          <Ionicons name={service.icon} size={18} color={"#696969"} />
          <Text style={styles.tipo}>{service.title}</Text>
        </View>
        <Text style={styles.fecha}>{formatShortDate(item.serviceDate)}</Text>
      </View>

      <View style={styles.detallesRow}>
        <View style={styles.detalleItem}>
          <Ionicons name="speedometer-outline" size={18} color="#666" />
          <Text style={styles.detalleText}>
            {item.mileage.toLocaleString()} km
          </Text>
        </View>
        <View style={styles.detalleItem}>
          <Ionicons name="cash-outline" size={18} color="#22C55E" />
          <Text style={styles.detalleText}>
            ${item.cost.toLocaleString("es-AR")}
          </Text>
        </View>
      </View>

      {item.note && <Text style={styles.notas}>{item.note}</Text>}

      <TouchableOpacity style={styles.verMas}>
        <Text style={styles.verMasText}>Ver detalles y fotos →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  historialCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  fecha: {
    fontSize: 15,
    color: "#666",
    fontWeight: "500",
  },
  detallesRow: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 12,
  },
  detalleItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  detalleText: {
    fontSize: 15,
    color: "#444",
  },
  notas: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
    marginBottom: 12,
  },
  verMas: {
    marginTop: 8,
    alignSelf: "flex-start",
  },
  verMasText: {
    color: "#FF6200",
    fontSize: 14,
    fontWeight: "600",
  },
  tipo: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111",
  },
});
