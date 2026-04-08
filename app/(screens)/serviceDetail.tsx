import ConfirmAction from "@/components/inputs/ConfirmAction";
import ActionButton from "@/components/ui/ActionButton";
import { useServiceContext } from "@/context/ServiceContext";
import { BASIC } from "@/styles/basicStyles";
import { UpdateService } from "@/types/Service";
import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ICON_OPTIONS: React.ComponentProps<typeof Ionicons>["name"][] = [
  "construct-outline",
  "build-outline",
  "hammer-outline",
  "settings-outline",
  "cog-outline",
  "shapes-outline",

  "color-fill-outline",
  "water-outline",
  "funnel-outline",
  "snow-outline",

  "cellular-outline",
  "compass-outline",

  "speedometer-outline",
  "disc-outline",
  "link-outline",

  "battery-dead-outline",
  "flash-outline",
  "hardware-chip-outline",
  "bulb-outline",
  "analytics-outline",
  "fitness-outline",

  "eye-outline",
  "radio-outline",
  "shield-outline",
  "warning-outline",
  "alert-circle-outline",
  "lock-closed-outline",

  "key-outline",
  "folder-open-outline",
  "copy-outline",

  "bookmarks-outline",
  "book-outline",
  "wallet-outline",
  "albums-outline",
  "reader-outline",
  "barcode-outline",

  "heart-outline",
  "heart-dislike-outline",
  "happy-outline",
  "sad-outline",
  "card-outline",
  "cash-outline",
] as const;

export default function serviceDetail() {
  const { selectedService, updateService, deleteService } = useServiceContext();
  const [tryDelete, setTryDelete] = useState(false);

  if (!selectedService) return null;

  const [iconSelected, setIconSelected] = useState<
    React.ComponentProps<typeof Ionicons>["name"] | ""
  >(selectedService?.icon);
  const [serviceTitle, setServiceTitle] = useState(selectedService.title);
  const [kmRemainder, setKmRemainder] = useState<string>(
    String(selectedService.changeEvery),
  );

  function handleDelete() {
    if (selectedService == null) return;
    deleteService(selectedService.id);
    setTryDelete(false);
    router.back();
  }

  const handleEdit = async () => {
    if (!serviceTitle.trim()) {
      alert("El nombre del servicio no puede estar vacio");
      return;
    }

    if (!iconSelected) {
      alert("El titulo no puede estar vacio");
      return;
    }

    const newKm = Number(kmRemainder);
    let updateObj: UpdateService = { id: selectedService.id };

    if (serviceTitle != selectedService.title) {
      updateObj.title = serviceTitle;
    }

    if (iconSelected != selectedService.icon) {
      updateObj.icon = iconSelected;
    }

    if (newKm != selectedService.changeEvery) {
      updateObj.changeEvery = newKm;
    }

    await updateService(updateObj);

    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ title: "Editar Servicio" }} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <ConfirmAction
          title="Confirmar eliminación"
          message="Se perderan todos los registros que estén enlazados a este servicio"
          confirmText="Eliminar"
          visible={tryDelete}
          onConfirm={handleDelete}
          onCancel={() => setTryDelete(false)}
        />

        <View style={styles.field}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            placeholder="Ej: Cambio de aceite"
            value={serviceTitle}
            onChangeText={setServiceTitle}
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <View style={BASIC.row}>
            <Text style={styles.label}>Cada cuántos km</Text>
            <Text style={BASIC.optional}>(opcional)</Text>
          </View>
          <TextInput
            placeholder="Ej: 5000"
            keyboardType="numeric"
            style={styles.input}
            value={kmRemainder}
            onChangeText={(text) => {
              if (/^\d*$/.test(text)) {
                setKmRemainder(text);
              }
            }}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Icono</Text>
          <View style={styles.iconGrid}>
            {ICON_OPTIONS.map((icon, index) => {
              const selected = iconSelected === icon;

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setIconSelected(icon)}
                  style={[styles.iconItem, selected && styles.iconItemSelected]}
                >
                  <Ionicons
                    name={icon}
                    size={24}
                    color={selected ? "#fff" : "#FF6200"}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <ActionButton
          text="Actualizar Servicio"
          onPress={handleEdit}
          variant="secondary"
        />
        <ActionButton
          text="Eliminar Servicio"
          onPress={() => setTryDelete(true)}
          variant="danger"
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  iconItem: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
  },
  iconItemSelected: {
    backgroundColor: "#ff7b28",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#ff7b28",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
