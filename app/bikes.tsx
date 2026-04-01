// app/(tabs)/mi-moto.tsx
import BikeSelector from "@/components/BikeSelector";
import ServicesBlockToConfig from "@/components/editable/ServicesBlockToConfig";
import EmptyStateBike from "@/components/emptyBlocks/EmptyStateBike";
import ImageBanner from "@/components/ImageBanner";
import { useBikeContext } from "@/context/BikeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MiMotoScreen() {
  const { selectedBike } = useBikeContext();
  const insets = useSafeAreaInsets();

  if (!selectedBike) return <EmptyStateBike />;
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
      }}
    >
      <View style={{ paddingHorizontal: 16 }}>
        <BikeSelector />
      </View>
      {selectedBike && (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.imageContainer}>
            <ImageBanner />
            <TouchableOpacity style={styles.editImageButton}>
              <Ionicons name="camera" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.infoGrid}>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Marca</Text>
              <Text style={styles.infoValue}>{selectedBike.brand}</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Modelo</Text>
              <Text style={styles.infoValue}>{selectedBike.model}</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Año</Text>
              <Text style={styles.infoValue}>{selectedBike.year}</Text>
            </View>
          </View>

          <ServicesBlockToConfig />

          <TouchableOpacity style={styles.editarMotoButton}>
            <Ionicons name="create-outline" size={20} color="#FFF" />
            <Text style={styles.editarMotoText}>
              Editar información de la moto
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
  },
  imageContainer: {
    height: 220,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 24,
    position: "relative",
    backgroundColor: "#EEE",
  },
  motoImage: {
    width: "100%",
    height: "100%",
  },
  editImageButton: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: "#FF6200",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  infoGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 12,
  },
  infoCard: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  infoLabel: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
  serviceCard: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  progressContainer: {
    alignItems: "center",
    marginVertical: 12,
  },
  progressCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#FFF",
    borderWidth: 12,
    borderColor: "#FF6200",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF6200",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  progressPercentage: {
    fontSize: 36,
    fontWeight: "700",
    color: "#FF6200",
  },
  progressTarget: {
    fontSize: 18,
    color: "#444",
    marginTop: 4,
  },
  serviceSubtitle: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    marginTop: 8,
  },
  intervalosContainer: {
    marginBottom: 30,
  },
  intervaloItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  intervaloLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  intervaloTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  intervaloSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  editarMotoButton: {
    backgroundColor: "#FF6200",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 40,
  },
  editarMotoText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "600",
  },
});
