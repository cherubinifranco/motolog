import { BASIC } from "@/styles/basicStyles";
import { Ionicons } from "@expo/vector-icons";
import { ExternalPathString, Link, RelativePathString } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type LinkType = {
  text: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  href: ExternalPathString | RelativePathString;
  variant?: "primary" | "secondary";
  align?: "left" | "center";
  arrow?: boolean;
};

const ICON_COLOR = {
  primary: "#ff7b28",
  secondary: "#FFF",
};

export default function InternalLink({
  text,
  icon,
  href,
  variant = "primary",
  align = "center",
  arrow = false,
}: LinkType) {
  return (
    <Link href={href} asChild style={BASIC.littleShadow}>
      <TouchableOpacity style={styles[variant]}>
        <View style={styles[align]}>
          <Ionicons name={icon} size={24} color={ICON_COLOR[variant]} />
          <Text style={textStyle[variant]}>{text}</Text>
        </View>
        {arrow && align != "center" && (
          <Ionicons
            name="chevron-forward"
            size={20}
            color={ICON_COLOR[variant]}
          />
        )}
      </TouchableOpacity>
    </Link>
  );
}

const textStyle = StyleSheet.create({
  primary: {
    color: "#000",
  },
  secondary: {
    color: "#FFF",
  },
});

const styles = StyleSheet.create({
  primary: {
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 16,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  secondary: {
    backgroundColor: "#ff7b28",
    padding: 18,
    borderRadius: 16,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  left: {
    width: "95%",
    gap: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  center: {
    width: "100%",
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
  },
});
