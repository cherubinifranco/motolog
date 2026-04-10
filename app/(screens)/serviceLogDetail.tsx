import ActionButton from "@/components/ui/ActionButton";
import { ItemWithIcon } from "@/components/ui/ItemWithIcon";
import { useBikeContext } from "@/context/BikeContext";
import { useServiceContext } from "@/context/ServiceContext";
import { useServiceLogContext } from "@/context/ServiceLogContext";
import { UpdateServiceLog } from "@/types/ServiceLog";
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

export default function serviceLogDetail() {
  const router = useRouter();

  const { selectedServiceLog } = useServiceLogContext();

  const { selectedBike, setSelectedBike, getBikeById } = useBikeContext();
  const { selectedService, setSelectedService, getServiceById } =
    useServiceContext();
  const { updateServiceLog, deleteServiceLog } = useServiceLogContext();

  if (!selectedServiceLog) return router.back();

  const [cost, setCost] = useState(String(selectedServiceLog.cost));
  const [note, setNote] = useState(selectedServiceLog.note);
  const [mileage, setMileage] = useState(String(selectedServiceLog.mileage));
  const [serviceDate, setServiceDate] = useState(
    new Date(selectedServiceLog.serviceDate),
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDelete = async () => {
    await deleteServiceLog(selectedServiceLog.id);
    return router.back();
  };

  const handleSave = async () => {
    if (!selectedBike || !selectedService) {
      alert("Seleccioná una moto y un servicio");
      return;
    }

    if (Number(mileage) < 1) {
      alert("El kilometraje no puede ser menor a 1");
      return;
    }

    let objUpdate: UpdateServiceLog = {
      id: selectedServiceLog.id,
    };

    if (selectedService.id != selectedServiceLog.serviceId) {
      objUpdate.serviceId = selectedService.id;
    }

    if (selectedBike.id != selectedServiceLog.bikeId) {
      objUpdate.bikeId = selectedBike.id;
    }

    if (serviceDate.toISOString() != selectedServiceLog.serviceDate) {
      objUpdate.serviceDate = serviceDate.toISOString();
    }

    if (Number(cost) != selectedServiceLog.cost) {
      objUpdate.cost = Number(cost);
    }

    if (Number(mileage) != selectedServiceLog.mileage) {
      objUpdate.mileage = Number(mileage);
    }

    if (note != selectedServiceLog.note) {
      objUpdate.note = note;
    }

    try {
      updateServiceLog(objUpdate);

      return router.back();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const bike = await getBikeById(selectedServiceLog.bikeId);
      const service = await getServiceById(selectedServiceLog.serviceId);
      setSelectedBike(bike);
      setSelectedService(service);
    };
    loadData();
  }, []);

  const onChangeDate = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setServiceDate(selectedDate);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "Editar Mantenimiento" }} />

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
            <ActionButton
              text="Guardar"
              variant="secondary"
              onPress={handleSave}
            />
            <ActionButton
              text="Eliminar Registro"
              variant="danger"
              onPress={handleDelete}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 60,
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
    padding: 12,
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
