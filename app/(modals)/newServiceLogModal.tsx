import { ItemWithIcon } from "@/components/ui/ItemWithIcon";
import { useBikeContext } from "@/context/BikeContext";
import { useServiceContext } from "@/context/ServiceContext";
import { useServiceLogContext } from "@/context/ServiceLogContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";

import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function NewServiceLogModal() {
  const router = useRouter();

  const { selectedBike } = useBikeContext();
  const { selectedService } = useServiceContext();
  const { createServiceLog } = useServiceLogContext();

  const [cost, setCost] = useState("");
  const [note, setNote] = useState("");
  const [mileage, setMileage] = useState("");
  const [serviceDate, setServiceDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = async () => {
    if (!selectedBike || !selectedService) {
      alert("Seleccioná una moto y un servicio");
      return;
    }

    if (Number(mileage) < 1) {
      alert("El kilometraje no puede ser menor a 1");
      return;
    }
    console.log({
      bikeId: selectedBike.id,
      serviceId: selectedService.id,
      cost: Number(cost) || 0,
      serviceDate: serviceDate.toISOString(),
      mileage: Number(mileage) || 0,
      note,
    });
    try {
      createServiceLog({
        bikeId: selectedBike.id,
        serviceId: selectedService.id,
        cost: Number(cost) || 0,
        serviceDate: serviceDate.toISOString(),
        mileage: Number(mileage) || 0,
        note,
      });
      router.back();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!selectedBike) return;
    setMileage(String(selectedBike.currentKm));
  }, [selectedBike]);

  const onChangeDate = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setServiceDate(selectedDate);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "Nuevo Service" }} />

      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#fff" }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <TouchableOpacity
            style={styles.selector}
            onPress={() => router.push("/bikeSelector")}
          >
            {selectedBike && (
              <View>
                <Image
                  source={{ uri: selectedBike?.imageUri }}
                  style={{ width: "100%", height: 160 }}
                  resizeMode="cover"
                />
                <Text style={styles.title}>
                  {`${selectedBike.brand} ${selectedBike.model}`}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {selectedService ? (
            <ItemWithIcon
              icon={selectedService.icon}
              title={selectedService.title}
              onPress={() => router.push("/serviceSelector")}
            />
          ) : (
            <ItemWithIcon
              icon={"apps"}
              title="Seleccionar Servicio"
              onPress={() => router.push("/serviceSelector")}
            />
          )}

          <Text style={styles.label}>Kilometraje</Text>
          <TextInput
            style={styles.input}
            value={mileage}
            onChangeText={setMileage}
            keyboardType="numeric"
            placeholder="Ej: 15000"
          />

          <Text style={styles.label}>Costo</Text>
          <TextInput
            style={styles.input}
            value={cost}
            onChangeText={setCost}
            keyboardType="numeric"
            placeholder="Ej: 20000"
          />

          <Text style={styles.label}>Fecha</Text>

          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{serviceDate.toLocaleDateString()}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={serviceDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onChangeDate}
            />
          )}

          <Text style={styles.label}>Notas</Text>
          <TextInput
            style={styles.notes}
            value={note}
            multiline={true}
            onChangeText={setNote}
            placeholder="Detalles del service..."
          />

          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.cancel}
              onPress={() => router.back()}
            >
              <Text>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.save} onPress={handleSave}>
              <Text style={{ color: "#fff" }}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 400,
  },
  title: {
    fontSize: 20,
    padding: 10,
    paddingBottom: 2,
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
  selector: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    justifyContent: "center",
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
  notes: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    height: 100,
    textAlignVertical: "top",
  },
});
