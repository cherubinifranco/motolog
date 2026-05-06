import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type UpdateKmPanelProps = {
  visible: boolean;
  currentKm: number;
  onClose: () => void;
  onSave: (km: number) => void;
};

export default function UpdateKmPanel({
  visible,
  currentKm,
  onClose,
  onSave,
}: UpdateKmPanelProps) {
  const [km, setKm] = useState<string>("");

  if (!visible) return null;

  const handleSave = () => {
    const parsedKm = Number(km);

    if (isNaN(parsedKm)) return;

    onSave(parsedKm);
    setKm("");
  };

  return (
    <View style={styles.card}>
      <TextInput
        style={styles.input}
        placeholder="Nuevo kilometraje"
        keyboardType="numeric"
        value={km}
        onChangeText={setKm}
      />

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.cancel} onPress={onClose}>
          <Text>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.save} onPress={handleSave}>
          <Text style={{ color: "#fff" }}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  current: {
    marginBottom: 10,
    color: "#666",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  cancel: {
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  save: {
    padding: 10,
    backgroundColor: "#FF6A00",
    borderRadius: 8,
  },
});
