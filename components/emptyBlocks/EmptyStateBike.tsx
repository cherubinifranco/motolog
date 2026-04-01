import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function EmptyStateBike() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aún no hay motos registradas</Text>

      <Text style={styles.subtitle}>
        Agregá tu primera moto para empezar a llevar el control de mantenimiento
      </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Registrar mi moto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    paddingVertical: 80,
    height: 500,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FF6A00",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
