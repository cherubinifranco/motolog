import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ImagePickerProps = {
  currentImage?: string;
  onImageSelected: (uri: string) => void;
  placeholderText?: string;
};

export default function ImagePickerComponent({
  currentImage,
  onImageSelected,
  placeholderText = "Sin imagen seleccionada",
}: ImagePickerProps) {
  const [imageUri, setImageUri] = useState<string | null>(currentImage || null);
  const [buttonsOpen, setButtonsOpen] = useState<boolean>(true);

  const pickImageFromGallery = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permiso denegado", "Necesitamos acceso a la galería");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      onImageSelected(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permiso denegado", "Necesitamos acceso a la cámara");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      onImageSelected(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={{ color: "#666", marginVertical: 10 }}>
            {placeholderText}
          </Text>
        </View>
      )}
      {buttonsOpen && (
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            onPress={pickImageFromGallery}
          >
            <Ionicons name={"images"} size={24} color={"#666"} />
            <Text>Galería</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Ionicons name={"camera"} size={24} color={"#666"} />
            <Text>Cámara</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    alignItems: "center",
  },
  cameraContainer: {
    position: "absolute",
    top: 160,
    right: 18,
    padding: 10,
  },
  placeholder: {
    width: "100%",
    height: 200,
    backgroundColor: "#eee",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  image: {
    width: "100%",
    aspectRatio: "16/9",
    borderRadius: 12,
    marginBottom: 12,
  },
  buttons: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
});
