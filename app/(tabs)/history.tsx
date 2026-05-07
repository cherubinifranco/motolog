import SkeletonLoaderLogs from "@/components/emptyBlocks/SkeletonLoaderLogs";
import LogItem from "@/components/LogItem";
import InternalLink from "@/components/ui/InternalLink";
import { useServiceContext } from "@/context/ServiceContext";
import { useServiceLogContext } from "@/context/ServiceLogContext";
import { ServiceLog } from "@/types/ServiceLog";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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
  const { serviceLogs, loading } = useServiceLogContext();
  const { services } = useServiceContext();

  const [sortedServices, setSortedServices] = useState<ServiceLog[]>([]);

  const [filter, setFilter] = useState<Filter>(baseFilter);

  const [searchText, setSearchText] = useState("");

  const filteredItems = useMemo(() => {
    return serviceLogs.filter((item) => {
      const matchesText = filter.text === "";

      const matchesService =
        filter.serviceIds.length === 0 ||
        filter.serviceIds.includes(item.serviceId);

      const itemDate = new Date(item.serviceDate).getTime();

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
  }, [serviceLogs, filter]);

  return (
    <View style={{ flex: 0, paddingTop: 40 }}>
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
          placeholder="Buscar..."
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
        {services.map((service) => {
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
        {serviceLogs.length === 0 ? (
          loading ? (
            [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
              <SkeletonLoaderLogs key={index} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.emptyState}>
                <Ionicons name="document-text-outline" size={60} color="#CCC" />
                <Text style={styles.emptyText}>
                  No se encontraron mantenimientos
                </Text>
              </View>
              <InternalLink
                text="Registrar el primer mantenimiento"
                href="../newServiceLogModal"
                icon="add"
              />
            </View>
          )
        ) : (
          serviceLogs.map((item) => <LogItem item={item} key={item.id} />)
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
    backgroundColor: "#ff7b28",
    borderColor: "#ff7b28",
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
    padding: 16,
    paddingBottom: 200,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    marginTop: 20,
    marginBottom: 50,
    fontSize: 16,
    color: "#999",
  },
});
