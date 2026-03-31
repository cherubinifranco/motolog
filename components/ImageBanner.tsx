import {
  Image,
  StyleSheet,
  View
} from "react-native";

export default function ImageBanner() {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop", // Honda CBR roja (puedes cambiarla)
        }}
        style={styles.motoImage}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
});
