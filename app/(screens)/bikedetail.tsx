import CurrentKm from "@/components/CurrentKm";
import ServicesBlockToConfig from "@/components/editable/ServicesBlockToConfig";
import EmptyStateBike from "@/components/emptyBlocks/EmptyStateBike";
import ImagePickerComponent from "@/components/ImagePickerComponent";
import ConfirmActionPopup from "@/components/inputs/ConfirmActionCode";
import ActionButton from "@/components/ui/ActionButton";
import { useBikeContext } from "@/context/BikeContext";
import { UpdateBike } from "@/types/Bike";
import { saveImageLocally } from "@/utils/saveImageLocally";
import { router, Stack } from "expo-router";
import React, { useState } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

export default function MiMotoScreen() {
  const { selectedBike, deleteBike, updateBike } = useBikeContext();

  if (!selectedBike) return <EmptyStateBike />;

  const [brand, setBrand] = useState(selectedBike.brand);
  const [model, setModel] = useState(selectedBike.model);
  const [year, setYear] = useState(String(selectedBike.year));
  const [image, setImage] = useState(selectedBike.imageUri || "");

  const [tryDelete, setTryDelete] = useState(false);

  function handleDelete() {
    if (selectedBike == null) return;
    deleteBike(selectedBike.id);
    setTryDelete(false);
    router.back();
  }

  function onSelectImage(uri: string) {
    setImage(uri);
  }

  async function handleSave() {
    if (selectedBike == null) return;

    const parsedYear = Number(year);

    let updateObj: UpdateBike = { id: selectedBike.id };

    if (selectedBike.brand !== brand) {
      updateObj.brand = brand;
    }

    if (selectedBike.year !== parsedYear) {
      updateObj.year = parsedYear;
    }

    if (selectedBike.model !== model) {
      updateObj.model = model;
    }

    if (selectedBike.brand !== brand) {
      updateObj.brand = brand;
    }

    if (selectedBike.imageUri !== image) {
      const parsedImage = await saveImageLocally(image);
      updateObj.imageUri = parsedImage;
    }

    await updateBike(updateObj);

    router.back();
  }

  return (
    <>
      <Stack.Screen options={{ title: "Detalles" }} />

      <View
        style={{
          flex: 1,
        }}
      >
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
            <ImagePickerComponent
              currentImage={image}
              onImageSelected={onSelectImage}
            />

            <View style={styles.infoGrid}>
              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>Marca</Text>
                <TextInput
                  style={styles.infoValue}
                  value={brand}
                  onChangeText={setBrand}
                />
              </View>
              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>Modelo</Text>
                <TextInput
                  style={styles.infoValue}
                  value={model}
                  onChangeText={setModel}
                />
              </View>
              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>Año</Text>
                <TextInput
                  style={styles.infoValue}
                  keyboardType="numeric"
                  value={year}
                  onChangeText={setYear}
                />
              </View>
            </View>

            <CurrentKm />

            <ServicesBlockToConfig />

            <ActionButton
              text="Guardar Cambioss"
              onPress={() => console.log("SD")}
              variant="secondary"
              icon="checkmark-circle"
            />

            <View style={styles.dangerZone}>
              <ActionButton
                text="Eliminar Moto"
                onPress={() => setTryDelete(true)}
                variant="danger"
                icon="close-circle"
              />
            </View>
          </ScrollView>
        )}
      </View>
    </>
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
    backgroundColor: "#ff7b28",
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
    backgroundColor: "#ff7b28",
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
});
