import ImagePickerComponent from "@/components/ImagePickerComponent";
import { useBikeContext } from "@/context/BikeContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function NewBikeModal() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [currentKm, setCurrentKm] = useState("");
  const router = useRouter();

  const { createBike } = useBikeContext();

  const handleSave = async () => {
    const parsedYear = Number(year);
    const parsedKm = Number(currentKm) || 0;

    if (!brand || !model || isNaN(parsedYear)) {
      alert("Por favor completá todos los campos");
      return;
    }

    console.log({ brand, model, year: parsedYear, currentKm: parsedKm });
    await createBike({ brand, model, year: parsedYear, currentKm: parsedKm });
    router.back();
  };

  function onSelectImage(uri: string) {
    console.log(uri);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <ImagePickerComponent onImageSelected={onSelectImage} />
        <Text style={styles.label}>Marca</Text>
        <TextInput
          style={styles.input}
          value={brand}
          onChangeText={setBrand}
          placeholder="Ej: Yamaha"
        />

        <Text style={styles.label}>Modelo</Text>
        <TextInput
          style={styles.input}
          value={model}
          onChangeText={setModel}
          placeholder="Ej: R6"
        />

        <Text style={styles.label}>Año</Text>
        <TextInput
          style={styles.input}
          value={year}
          onChangeText={setYear}
          placeholder="Ej: 2021"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Kilometraje inicial (opcional)</Text>
        <TextInput
          style={styles.input}
          value={currentKm}
          onChangeText={setCurrentKm}
          placeholder="Ej: 12000"
          keyboardType="numeric"
        />

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.cancel} onPress={() => router.back()}>
            <Text>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.save} onPress={handleSave}>
            <Text style={{ color: "#fff" }}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 400,
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
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 12,
  },
  cancel: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  save: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#FF6A00",
    borderRadius: 8,
  },
});
