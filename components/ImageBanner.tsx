import { BASIC } from "@/styles/basicStyles";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, View } from "react-native";

export default function ImageBanner({
  imageUri,
  style = styles.imageContainer,
}: {
  imageUri: string | undefined;
  style?: any;
}) {
  return (
    <View style={style}>
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={[styles.motoImage, style]}
          resizeMode="cover"
        />
      ) : (
        <View
          style={[
            {
              backgroundColor: "#f7f7f7",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            },
            ,
            BASIC.littleShadow,
            style,
          ]}
        >
          <Ionicons name="camera-outline" size={40} color={"#727272"} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: 220,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 24,
    backgroundColor: "#EEE",
  },
  motoImage: {
    width: "100%",
    height: "100%",
  },
});
