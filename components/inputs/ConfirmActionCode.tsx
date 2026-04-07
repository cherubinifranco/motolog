import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type ConfirmActionPopupProps = {
  title: string;
  message: string;
  confirmText: string;
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmActionCode({
  title = "title",
  message = "message",
  confirmText = "confirmText",
  visible,
  onCancel,
  onConfirm,
}: ConfirmActionPopupProps) {
  const [code, setCode] = useState("");
  const [randomCode, setRandomCode] = useState("");

  useEffect(() => {
    if (visible) {
      const newCode = Math.floor(1000 + Math.random() * 9000).toString();
      setRandomCode(newCode);
      setCode("");
    }
  }, [visible]);

  const handleConfirm = () => {
    if (code === randomCode) {
      onConfirm();
    } else {
      return;
    }
  };

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <Text style={styles.code}>{randomCode}</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder=""
            value={code}
            onChangeText={setCode}
            maxLength={4}
          />
          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.button, styles.cancel]}
              onPress={onCancel}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirm]}
              onPress={handleConfirm}
            >
              <Text style={styles.buttonText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  message: {
    fontSize: 14,
    color: "#444",
    textAlign: "center",
    marginBottom: 16,
  },
  code: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 4,
    marginBottom: 16,
  },
  input: {
    width: "60%",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 8,
    textAlign: "center",
    fontSize: 18,
    marginBottom: 24,
  },
  buttons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: "center",
  },
  cancel: {
    backgroundColor: "#666",
  },
  confirm: {
    backgroundColor: "#E53935",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});
