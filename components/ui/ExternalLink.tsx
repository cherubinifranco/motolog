import { Ionicons } from "@expo/vector-icons";
import { ExternalPathString, Link, RelativePathString } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type LinkType = {
  text: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  href: ExternalPathString | RelativePathString;
};

export default function ExternalLink({ text, icon, href }: LinkType) {
  return (
    <Link href={href} asChild>
      <TouchableOpacity style={styles.optionItem}>
        <View style={styles.optionLeft}>
          <Ionicons name={icon} size={24} color="#FF6200" />
          <Text style={styles.optionText}>{text}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#999" />
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
  },
  optionText: {
    fontSize: 16,
    color: "#111",
    fontWeight: "500",
  },
  optionValue: {
    fontSize: 15,
    color: "#666",
    marginRight: 8,
  },
});
