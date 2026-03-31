// app/(tabs)/historial.tsx
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

type Mantenimiento = {
  id: string;
  fecha: string;
  tipo: string;
  kilometraje: number;
  costo: number;
  estado: "Completado" | "Pendiente";
  notas?: string;
};

const mantenimientos: Mantenimiento[] = [
  {
    id: "1",
    fecha: "15 mar 2026",
    tipo: "Cambio de aceite",
    kilometraje: 15234,
    costo: 8500,
    estado: "Completado",
  },
  {
    id: "2",
    fecha: "10 feb 2026",
    tipo: "Revisión de frenos",
    kilometraje: 12800,
    costo: 25000,
    estado: "Completado",
  },
  {
    id: "3",
    fecha: "05 feb 2026",
    tipo: "Lubricación de cadena",
    kilometraje: 12500,
    costo: 4500,
    estado: "Completado",
  },
  {
    id: "4",
    fecha: "20 ene 2026",
    tipo: "Cambio de filtro de aire",
    kilometraje: 11000,
    costo: 12000,
    estado: "Completado",
  },
];

export default function HistorialScreen() {
  const [searchText, setSearchText] = useState("");
  const [filtroActivo, setFiltroActivo] = useState<
    "Todos" | "Aceite" | "Frenos" | "Cadena"
  >("Todos");

  const filtros = ["Todos", "Aceite", "Frenos", "Cadena"];

  const mantenimientosFiltrados = mantenimientos.filter((item) => {
    const coincideBusqueda =
      item.tipo.toLowerCase().includes(searchText.toLowerCase()) ||
      item.fecha.toLowerCase().includes(searchText.toLowerCase());

    let coincideFiltro = true;
    if (filtroActivo !== "Todos") {
      coincideFiltro = item.tipo
        .toLowerCase()
        .includes(filtroActivo.toLowerCase());
    }

    return coincideBusqueda && coincideFiltro;
  });

  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <View style={styles.header}>
        <Text style={styles.title}>Historial</Text>
      </View>

      {/* Barra de búsqueda */}
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

      {/* Filtros */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtrosScroll}
        contentContainerStyle={styles.filtrosContainer}
      >
        {filtros.map((filtro) => (
          <TouchableOpacity
            key={filtro}
            style={[
              styles.filtroChip,
              filtroActivo === filtro && styles.filtroChipActive,
            ]}
            onPress={() => setFiltroActivo(filtro as any)}
          >
            <Text
              style={[
                styles.filtroText,
                filtroActivo === filtro && styles.filtroTextActive,
              ]}
            >
              {filtro}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {mantenimientosFiltrados.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={60} color="#CCC" />
            <Text style={styles.emptyText}>
              No se encontraron mantenimientos
            </Text>
          </View>
        ) : (
          mantenimientosFiltrados.map((item) => (
            <TouchableOpacity key={item.id} style={styles.historialCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.fecha}>{item.fecha}</Text>
                <View style={styles.estadoBadge}>
                  <Text style={styles.estadoText}>{item.estado}</Text>
                </View>
              </View>

              <Text style={styles.tipo}>{item.tipo}</Text>

              <View style={styles.detallesRow}>
                <View style={styles.detalleItem}>
                  <Ionicons name="speedometer-outline" size={18} color="#666" />
                  <Text style={styles.detalleText}>
                    {item.kilometraje.toLocaleString()} km
                  </Text>
                </View>
                <View style={styles.detalleItem}>
                  <Ionicons name="cash-outline" size={18} color="#22C55E" />
                  <Text style={styles.detalleText}>
                    ${item.costo.toLocaleString("es-AR")}
                  </Text>
                </View>
              </View>

              {item.notas && <Text style={styles.notas}>{item.notas}</Text>}

              <TouchableOpacity style={styles.verMas}>
                <Text style={styles.verMasText}>Ver detalles y fotos →</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  filtroChip: {
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
    padding: 16,
    paddingBottom: 24,
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
    marginBottom: 10,
  },
  fecha: {
    fontSize: 15,
    color: "#666",
    fontWeight: "500",
  },
  estadoBadge: {
    backgroundColor: "#22C55E",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  estadoText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "600",
  },
  tipo: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
    marginBottom: 12,
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
