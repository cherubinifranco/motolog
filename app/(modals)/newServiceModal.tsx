import ActionButton from "@/components/ui/ActionButton";
import { useServiceContext } from "@/context/ServiceContext";
import { BASIC } from "@/styles/basicStyles";
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

export default function NewServiceModal() {
  const { createService } = useServiceContext();

  const [iconSelected, setIconSelected] = useState<
    React.ComponentProps<typeof Ionicons>["name"] | ""
  >("");
  const [serviceTitle, setServiceTitle] = useState("");
  const [kmRemainder, setKmRemainder] = useState("");

  const handleCreate = async () => {
    if (!serviceTitle.trim()) {
      alert("El nombre del servicio no puede estar vacio");
      return;
    }

    if (!iconSelected) {
      alert("El titulo no puede estar vacio");
      return;
    }

    try {
      const service = await createService({
        icon: iconSelected,
        title: serviceTitle,
        changeEvery: kmRemainder ? Number(kmRemainder) : 0,
      });

      router.back();
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "Nuevo Servicio" }} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
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
          text="Crear Servicio"
          onPress={handleCreate}
          variant="secondary"
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
