import StatCard from "@/components/StatCard";
import { useBikeContext } from "@/context/BikeContext";
import { useServiceLogContext } from "@/context/ServiceLogContext";
import { MONTHS, useServiceStats } from "@/hooks/useServiceStats";
import { ServiceLog } from "@/types/ServiceLog";
import { useEffect, useMemo, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Mode = "spent" | "services";

export default function Stats() {
  const insets = useSafeAreaInsets();
  const currentYear = new Date().getFullYear();

  const { getServiceLogsByYear } = useServiceLogContext();
  const { bikes } = useBikeContext();

  const [logs, setLogs] = useState<ServiceLog[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [mode, setMode] = useState<Mode>("spent");
  const [selectedBikeId, setSelectedBikeId] = useState<number | "all">("all");

  const loadLogs = async () => {
    const result = await getServiceLogsByYear(currentYear);
    setLogs(result || []);
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadLogs();
    setRefreshing(false);
  };

  const filteredLogs = useMemo(() => {
    if (selectedBikeId === "all") return logs;
    return logs.filter((log) => log.bikeId === selectedBikeId);
  }, [logs, selectedBikeId]);

  const stats = useServiceStats(filteredLogs);

  const maxValue = useMemo(() => {
    return mode === "spent"
      ? Math.max(...stats.monthly.map((m) => m.totalSpent), 1)
      : Math.max(...stats.monthly.map((m) => m.totalServices), 1);
  }, [stats, mode]);

  const firstRow = stats.monthly.slice(0, 6);
  const secondRow = stats.monthly.slice(6, 12);

  const renderMonth = (m: any) => {
    const value = mode === "spent" ? m.totalSpent : m.totalServices;

    const height = value === 0 ? 6 : Math.max((value / maxValue) * 90, 6);

    return (
      <View key={m.month} style={styles.monthItem}>
        <Text style={styles.monthLabel}>{MONTHS[m.month].slice(0, 3)}</Text>

        <View
          style={[
            styles.bar,
            {
              height,
              backgroundColor: mode === "spent" ? "#22C55E" : "#ff7b28",
            },
          ]}
        />

        <Text style={styles.monthValue}>
          {mode === "spent"
            ? `$${m.totalSpent.toLocaleString("es-AR")}`
            : `${m.totalServices}x`}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.title}>Estadísticas</Text>

        <View style={styles.toggle}>
          <TouchableOpacity
            style={[styles.toggleBtn, mode === "spent" && styles.toggleActive]}
            onPress={() => setMode("spent")}
          >
            <Text
              style={[
                styles.toggleText,
                mode === "spent" && styles.toggleTextActive,
              ]}
            >
              Gastos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleBtn,
              mode === "services" && styles.toggleActive,
            ]}
            onPress={() => setMode("services")}
          >
            <Text
              style={[
                styles.toggleText,
                mode === "services" && styles.toggleTextActive,
              ]}
            >
              Mantenimientos
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bikeSelector}>
          <TouchableOpacity
            style={[
              styles.bikeChip,
              selectedBikeId === "all" && styles.bikeChipActive,
            ]}
            onPress={() => setSelectedBikeId("all")}
          >
            <Text
              style={[
                styles.bikeText,
                selectedBikeId === "all" && styles.bikeTextActive,
              ]}
            >
              Todas
            </Text>
          </TouchableOpacity>

          {bikes.map((bike) => (
            <TouchableOpacity
              key={bike.id}
              style={[
                styles.bikeChip,
                selectedBikeId === bike.id && styles.bikeChipActive,
              ]}
              onPress={() => setSelectedBikeId(bike.id)}
            >
              <Text
                style={[
                  styles.bikeText,
                  selectedBikeId === bike.id && styles.bikeTextActive,
                ]}
              >
                {bike.brand} {bike.model}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            {mode === "spent" ? "Gastos mensuales" : "Mantenimientos mensuales"}
          </Text>

          <View style={styles.monthGrid}>
            <View style={styles.row}>{firstRow.map(renderMonth)}</View>
            <View style={styles.row}>{secondRow.map(renderMonth)}</View>
          </View>
        </View>

        <View style={styles.summaryGrid}>
          {mode === "spent" ? (
            <>
              <StatCard
                icon="cash-outline"
                color="#22C55E"
                value={`$${stats.totalSpent.toLocaleString("es-AR")}`}
                label="Total gastado"
              />

              <StatCard
                icon="trending-up"
                color="#3B82F6"
                value={`$${Math.round(stats.averageCost).toLocaleString(
                  "es-AR",
                )}`}
                label="Promedio por mes"
              />

              <StatCard
                icon="trophy-outline"
                color="#F59E0B"
                value={
                  stats.mostExpensiveMonth
                    ? MONTHS[stats.mostExpensiveMonth.month]
                    : "-"
                }
                label="Mes más caro"
              />

              <StatCard
                icon="wallet-outline"
                color="#ff7b28"
                value={
                  stats.mostExpensiveMonth
                    ? `$${stats.mostExpensiveMonth.totalSpent.toLocaleString(
                        "es-AR",
                      )}`
                    : "-"
                }
                label="Gastado en ese mes"
              />
            </>
          ) : (
            <>
              <StatCard
                icon="construct-outline"
                color="#ff7b28"
                value={stats.totalServices}
                label="Total Mantenimientos"
              />

              <StatCard
                icon="trending-up"
                color="#3B82F6"
                value={(stats.totalServices / 12).toFixed(1)}
                label="Promedio por mes"
              />

              <StatCard
                icon="trophy-outline"
                color="#F59E0B"
                value={
                  stats.mostActiveMonth
                    ? MONTHS[stats.mostActiveMonth.month]
                    : "-"
                }
                label="Mes más activo"
              />

              <StatCard
                icon="construct-outline"
                color="#ff7b28"
                value={
                  stats.mostActiveMonth
                    ? stats.mostActiveMonth.totalServices
                    : 0
                }
                label="Servicios ese mes"
              />
            </>
          )}
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

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 16,
  },

  toggle: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },

  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },

  toggleActive: {
    backgroundColor: "#ff7b28",
  },

  toggleText: {
    color: "#666",
    fontWeight: "500",
  },

  toggleTextActive: {
    color: "#fff",
  },

  bikeSelector: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },

  bikeChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
  },

  bikeChipActive: {
    backgroundColor: "#ff7b28",
    borderColor: "#ff7b28",
  },

  bikeText: {
    color: "#666",
    fontSize: 12,
  },

  bikeTextActive: {
    color: "#fff",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },

  monthGrid: {
    gap: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  monthItem: {
    flex: 1,
    alignItems: "center",
  },

  bar: {
    width: 10,
    borderRadius: 6,
    marginVertical: 6,
  },

  monthLabel: {
    fontSize: 11,
    color: "#666",
  },

  monthValue: {
    fontSize: 10,
    fontWeight: "600",
  },

  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
});
