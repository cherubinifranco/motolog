import BikeSelector from "@/components/BikeSelector";
import CurrentKm from "@/components/CurrentKm";
import ServicesBlockToConfig from "@/components/editable/ServicesBlockToConfig";
import EmptyStateBike from "@/components/emptyBlocks/EmptyStateBike";
import ImageBanner from "@/components/ImageBanner";
import ConfirmActionPopup from "@/components/inputs/ConfirmActionPopup";
import { useBikeContext } from "@/context/BikeContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function MiMotoScreen() {
  const { selectedBike, deleteBike } = useBikeContext();

  const [tryDelete, setTryDelete] = useState(false);

  function handleDelete() {
    if (selectedBike == null) return;
    deleteBike(selectedBike.id);
    setTryDelete(false);
  }

  if (!selectedBike) return <EmptyStateBike />;

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={{ paddingHorizontal: 16 }}>
        <BikeSelector />
      </View>
      <ConfirmActionPopup
        title="Confirmar eliminación"
        message="Para eliminar esta moto, ingresa el siguiente código:"
        confirmText="Eliminar"
        visible={tryDelete}
        onConfirm={handleDelete}
        onCancel={() => setTryDelete(false)}
      />
      {selectedBike && (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <ImageBanner />

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

          <CurrentKm />

          <ServicesBlockToConfig />

          <TouchableOpacity style={styles.editarMotoButton}>
            <Ionicons
              name="ellipsis-horizontal-circle-sharp"
              size={20}
              color="#FFF"
            />
            <Text style={styles.editarMotoText}>Editar información</Text>
          </TouchableOpacity>

          <View style={styles.dangerZone}>
            <TouchableOpacity
              style={styles.dangerButton}
              onPress={() => setTryDelete(true)}
            >
              <Ionicons name="close-circle" size={20} color="#FFF" />
              <Text style={styles.editarMotoText}>Eliminar moto</Text>
            </TouchableOpacity>
          </View>
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
  editarMotoButton: {
    backgroundColor: "#FF6200",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 10,
    marginTop: 30,
  },
  editarMotoText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "600",
  },
  dangerZone: {
    paddingVertical: 10,
    borderTopColor: "rgb(255, 65, 65)",
    borderTopWidth: 2,
  },
  dangerButton: {
    backgroundColor: "rgb(255, 65, 65)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 16,
    borderRadius: 16,
  },
});
