import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function stats() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Estadísticas</Text>
        </View>

        <View style={styles.tabsContainer}>
          <View style={styles.tabActive}>
            <Text style={styles.tabTextActive}>Gastos</Text>
          </View>
          <View style={styles.tabInactive}>
            <Text style={styles.tabText}>Mantenimientos</Text>
          </View>
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Costos mensuales (ARS)</Text>
          <View style={styles.lineChartContainer}>
            <View style={styles.lineChart}>
              <View style={styles.line} />
              {[20, 35, 28, 45, 52, 40, 65, 78].map((height, index) => (
                <View
                  key={index}
                  style={[styles.chartPoint, { height: height }]}
                />
              ))}
            </View>
          </View>
          <View style={styles.monthLabels}>
            {["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago"].map(
              (mes) => (
                <Text key={mes} style={styles.monthLabel}>
                  {mes}
                </Text>
              ),
            )}
          </View>
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>
            Distribución por tipo de mantenimiento
          </Text>

          <View style={styles.donutContainer}>
            <View style={styles.donut}>
              <View style={styles.donutInner}>
                <Text style={styles.donutPercentage}>40%</Text>
                <Text style={styles.donutLabel}>Aceite</Text>
              </View>
            </View>
          </View>

          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: "#ff7b28" }]}
              />
              <Text style={styles.legendText}>Aceite - 40%</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: "#22C55E" }]}
              />
              <Text style={styles.legendText}>Frenos - 25%</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: "#3B82F6" }]}
              />
              <Text style={styles.legendText}>Cadena - 20%</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: "#8B5CF6" }]}
              />
              <Text style={styles.legendText}>Otros - 15%</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Resumen 2026</Text>

        <View style={styles.summaryGrid}>
          <View style={styles.summaryCard}>
            <Ionicons name="cash-outline" size={28} color="#22C55E" />
            <Text style={styles.summaryValue}>$145.000</Text>
            <Text style={styles.summaryLabel}>Total gastado</Text>
          </View>

          <View style={styles.summaryCard}>
            <Ionicons name="construct-outline" size={28} color="#ff7b28" />
            <Text style={styles.summaryValue}>8</Text>
            <Text style={styles.summaryLabel}>Mantenimientos</Text>
          </View>

          <View style={styles.summaryCard}>
            <Ionicons name="trending-up" size={28} color="#3B82F6" />
            <Text style={styles.summaryValue}>$18.125</Text>
            <Text style={styles.summaryLabel}>Promedio por servicio</Text>
          </View>

          <View style={styles.summaryCard}>
            <Ionicons name="speedometer" size={28} color="#ff7b28" />
            <Text style={styles.summaryValue}>4.500</Text>
            <Text style={styles.summaryLabel}>km recorridos</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  header: {
    marginBottom: 24,
  },
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  summaryCard: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111",
    marginTop: 8,
  },
  summaryLabel: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    marginTop: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  tabActive: {
    flex: 1,
    backgroundColor: "#ff7b28",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  tabInactive: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  tabTextActive: {
    color: "#FFF",
    fontWeight: "600",
  },
  tabText: {
    color: "#666",
    fontWeight: "500",
  },
  chartCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  chartTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111",
    marginBottom: 16,
  },
  lineChartContainer: {
    height: 180,
    justifyContent: "flex-end",
  },
  lineChart: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 140,
    gap: 12,
    paddingHorizontal: 10,
  },
  line: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#ff7b28",
    top: "50%",
    opacity: 0.3,
  },
  chartPoint: {
    flex: 1,
    backgroundColor: "#ff7b28",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    minWidth: 20,
  },
  monthLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingHorizontal: 8,
  },
  monthLabel: {
    fontSize: 12,
    color: "#666",
  },
  donutContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  donut: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#F1F1F1",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 25,
    borderColor: "#ff7b28",
  },
  donutInner: {
    alignItems: "center",
  },
  donutPercentage: {
    fontSize: 32,
    fontWeight: "700",
    color: "#ff7b28",
  },
  donutLabel: {
    fontSize: 14,
    color: "#666",
  },
  legend: {
    marginTop: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  legendColor: {
    width: 14,
    height: 14,
    borderRadius: 4,
    marginRight: 10,
  },
  legendText: {
    fontSize: 15,
    color: "#444",
  },

  nextMaintenanceCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },
  nextTitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 6,
  },
  nextType: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111",
    marginBottom: 8,
  },
  nextKm: {
    fontSize: 15,
    color: "#ff7b28",
    fontWeight: "500",
    marginBottom: 16,
  },
  recordarButton: {
    backgroundColor: "#ff7b28",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  recordarText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 8,
    color: "#111",
  },
});
