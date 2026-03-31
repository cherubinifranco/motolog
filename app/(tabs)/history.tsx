import LogItem from "@/components/LogItem";
import { useMaintenance } from "@/hooks/useMaintenance";
import { useServicesItems } from "@/hooks/useServicesItems";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

type Filter = {
  text: string;
  serviceIds: number[];
  fromDate?: string;
  toDate?: string;
  minCost?: number;
  maxCost?: number;
};

const baseFilter: Filter = {
  text: "",
  serviceIds: [],
};

export default function HistorialScreen() {
  const [filter, setFilter] = useState<Filter>(baseFilter);

  const [searchText, setSearchText] = useState("");

  const { items: servicesItems, loading: loadingServices } = useServicesItems();
  const { items: maintenanceItems, loading: loadingMaitenance } =
    useMaintenance();

  const serviceMap = useMemo(() => {
    return new Map(servicesItems.map((s) => [s.id, s]));
  }, [servicesItems]);

  const enrichedMaintenances = useMemo(() => {
    return maintenanceItems.map((m) => {
      const service = serviceMap.get(m.serviceId);

      return {
        ...m,
        service,
      };
    });
  }, [maintenanceItems, serviceMap]);

  const filteredItems = useMemo(() => {
    return enrichedMaintenances.filter((item) => {
      const service = serviceMap.get(item.serviceId);

      const matchesText =
        filter.text === "" ||
        service?.title.toLowerCase().includes(filter.text.toLowerCase());

      const matchesService =
        filter.serviceIds.length === 0 ||
        filter.serviceIds.includes(item.serviceId);

      const itemDate = new Date(item.date).getTime();

      const matchesFrom =
        !filter.fromDate || itemDate >= new Date(filter.fromDate).getTime();

      const matchesTo =
        !filter.toDate || itemDate <= new Date(filter.toDate).getTime();

      const matchesMin =
        filter.minCost === undefined || item.cost >= filter.minCost;

      const matchesMax =
        filter.maxCost === undefined || item.cost <= filter.maxCost;

      return (
        matchesText &&
        matchesService &&
        matchesFrom &&
        matchesTo &&
        matchesMin &&
        matchesMax
      );
    });
  }, [servicesItems, filter, serviceMap]);

  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <View style={styles.header}>
        <Text style={styles.title}>Historial</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por tipo o fecha..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#999"
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtrosScroll}
        contentContainerStyle={styles.filtrosContainer}
      >
        {servicesItems.map((service) => {
          const isActive = filter.serviceIds.includes(service.id);

          return (
            <TouchableOpacity
              key={service.id}
              style={[styles.filtroChip, isActive && styles.filtroChipActive]}
              onPress={() => {
                setFilter((prev) => ({
                  ...prev,
                  serviceIds: isActive
                    ? prev.serviceIds.filter((id) => id !== service.id)
                    : [...prev.serviceIds, service.id],
                }));
              }}
            >
              <Text
                style={[styles.filtroText, isActive && styles.filtroTextActive]}
              >
                {service.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredItems.length === 0 ? (
          loadingServices || loadingMaitenance ? (
            <ActivityIndicator style={{ padding: 20 }} />
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="document-text-outline" size={60} color="#CCC" />
              <Text style={styles.emptyText}>
                No se encontraron mantenimientos
              </Text>
            </View>
          )
        ) : (
          filteredItems.map((item) => <LogItem item={item} key={item.id} />)
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#111",
  },
  filtrosScroll: {
    marginBottom: 8,
  },
  filtrosContainer: {
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  filtroChip: {
    height: 40,
    backgroundColor: "#FFF",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  filtroChipActive: {
    backgroundColor: "#FF6200",
    borderColor: "#FF6200",
  },
  filtroText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  filtroTextActive: {
    color: "#FFF",
  },
  scrollContent: {
    minHeight: "100%",
    padding: 16,
    paddingBottom: 24,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: "#999",
  },
});
